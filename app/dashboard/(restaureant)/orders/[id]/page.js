"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const tables = useSelector((state) => state.table.table);
  const rooms = useSelector((state) => state.room.room);
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
    } catch {
      return "";
    }
  };

  const goBack = () => router.back();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-red-500 text-lg">Error loading order details</p>
        <Button onClick={goBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const getTableNumber = (id) => {
    const table = tables.find((t) => t.id === id);
    return table?.number || id;
  };

  const getRoomNumber = (id) => {
    const room = rooms.find((r) => r.id === id);
    return room?.number || id;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Order Info Header */}
      <Card className="rounded-2xl shadow-sm border mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex justify-between items-center">
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
              className="uppercase text-xs px-3 py-1"
            >
              {order.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Placed At</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            {order.tableId && (
              <div>
                <p className="text-muted-foreground">Table</p>
                <p className="font-medium">0{getTableNumber(order.tableId)}</p>
              </div>
            )}
            {order.roomId && (
              <div>
                <p className="text-muted-foreground">Room</p>
                <p className="font-medium">0{getRoomNumber(order.roomId)}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-semibold text-lg text-foreground">
                ${parseFloat(order.total).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <h2 className="text-xl font-semibold mb-4">Order Items</h2>
      {order.items && order.items.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {order.items.map((item) => (
            <Card key={item.id} className="rounded-xl border overflow-hidden">
              {item.menuItem?.image && (
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-full h-32 object-cover"
                />
              )}
              <CardContent className="py-4 px-3 space-y-1">
                <h3 className="text-base font-semibold">
                  {item.menuItem?.name || "Unknown Item"}
                </h3>
                {item.notes && (
                  <p className="text-xs text-muted-foreground">{item.notes}</p>
                )}
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-muted-foreground">Qty: {item.quantity}</span>
                  <span className="font-medium text-foreground">
                    ${parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-muted-foreground">
          No items found for this order
        </p>
      )}
    </div>
  );
}
