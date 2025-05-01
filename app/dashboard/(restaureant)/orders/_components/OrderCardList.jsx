"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderDetails } from "./orderdetails";

export default function OrderCardList({ data = [] }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // Client-side state for dates to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    const res = await fetch(`/api/orders/update-status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to update order status");
    }
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  // Navigate to order items page


  // Format date safely, only on client-side
  const formatDate = (dateString) => {
    if (!dateString) return "";
    if (!isClient) return ""; // Return empty on server to avoid hydration mismatch
    
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return "";
    }
  };

  // Check if data exists and is an array before mapping
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data.map((order) => (
        <Card key={order?.id || 'unknown'}>
          <CardHeader>
            <CardTitle className="text-lg">
              Order #{order?.id ? order.id.slice(0, 6) : 'N/A'}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {isClient ? formatDate(order?.createdAt) : "Loading..."}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Status:</span>
              <Badge
                variant={
                  order?.status === "PENDING"
                    ? "default"
                    : order?.status === "IN_PROGRESS"
                    ? "secondary"
                    : order?.status === "SERVED"
                    ? "success"
                    : "destructive"
                }
              >
                {order?.status || "UNKNOWN"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Total:</span>
              <span className="font-bold">
                ${order?.total ? parseFloat(order.total).toFixed(2) : '0.00'}
              </span>
            </div>
            {order?.roomId && (
              <div className="flex items-center justify-between">
                <span>Room:</span>
                <span>{order.roomId}</span>
              </div>
            )}
            {order?.tableId && (
              <div className="flex items-center justify-between">
                <span>Table:</span>
                <span>{order.tableId}</span>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-4">
              {/* Status update buttons */}
              <div className="flex gap-2">
                {order?.status === "PENDING" && (
                  <Button
                    variant="secondary"
                    onClick={() => order?.id && updateOrderStatus(order.id, "IN_PROGRESS")}
                  >
                    Mark In Progress
                  </Button>
                )}
                {order?.status === "IN_PROGRESS" && (
                  <Button
                    variant="success"
                    onClick={() => order?.id && updateOrderStatus(order.id, "SERVED")}
                  >
                    Mark Served
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => order?.id && updateOrderStatus(order.id, "CANCELLED")}
                  disabled={!order?.id}
                >
                  Cancel
                </Button>
              </div>
              
              {/* View items button */}
                <OrderDetails id={order.id}/>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}