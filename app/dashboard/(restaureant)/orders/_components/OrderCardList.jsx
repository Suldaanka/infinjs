"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function OrderCardList({ data }) {
  const queryClient = useQueryClient();

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

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle className="text-lg">Order #{order.id.slice(0, 6)}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Status:</span>
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
            </div>
            <div className="flex items-center justify-between">
              <span>Total:</span>
              <span className="font-bold">${parseFloat(order.total).toFixed(2)}</span>
            </div>
            {order.roomId && (
              <div className="flex items-center justify-between">
                <span>Room:</span>
                <span>{order.roomId}</span>
              </div>
            )}
            {order.tableId && (
              <div className="flex items-center justify-between">
                <span>Table:</span>
                <span>{order.tableId}</span>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              {order.status === "PENDING" && (
                <Button
                  variant="secondary"
                  onClick={() => updateOrderStatus(order.id, "IN_PROGRESS")}
                >
                  Mark In Progress
                </Button>
              )}
              {order.status === "IN_PROGRESS" && (
                <Button
                  variant="success"
                  onClick={() => updateOrderStatus(order.id, "SERVED")}
                >
                  Mark Served
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() => updateOrderStatus(order.id, "CANCELLED")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
