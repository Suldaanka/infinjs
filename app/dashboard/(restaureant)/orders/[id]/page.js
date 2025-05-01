"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const orderId = params?.id;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${orderId}/items`);
      if (!res.ok) throw new Error("Failed to fetch order items");
      return res.json();
    },
    enabled: !!orderId,
  });

  const formatDate = (dateString) => {
    if (!dateString || !isClient) return "";
    
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return "";
    }
  };

  const goBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading order details</p>
        <Button onClick={goBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={goBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order #{order.id.slice(0, 6)}</span>
            <Badge
              variant={
                order.status === "PENDING"
                  ? "default"
                  : order.status === "IN_PROGRESS"
                  ? "secondary"
                  : order.status === "SERVED"
                  ? "success"
                  : "destructive"
              }
            >
              {order.status}
            </Badge>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {formatDate(order.createdAt)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-bold">${parseFloat(order.total).toFixed(2)}</p>
            </div>
            {order.roomId && (
              <div>
                <p className="text-sm text-muted-foreground">Room</p>
                <p>{order.roomId}</p>
              </div>
            )}
            {order.tableId && (
              <div>
                <p className="text-sm text-muted-foreground">Table</p>
                <p>{order.tableId}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Order Items</h2>
      
      {order.items && order.items.length > 0 ? (
        <div className="space-y-4">
          {order.items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex justify-between items-center py-4">
                <div className="flex-1">
                  <h3 className="font-medium">{item.menuItem?.name || "Unknown Item"}</h3>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </div>
                  <div className="font-medium">
                    ${parseFloat(item.price).toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-muted-foreground">No items found for this order</p>
      )}
    </div>
  );
}