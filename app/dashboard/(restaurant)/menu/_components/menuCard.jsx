"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addItem } from "@/redux/features/order/orderSlice";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function MenuCard({ menuItems, onAddToOrder }) {

  const dispatch = useDispatch()
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {menuItems && menuItems.map((item) => {
        let imageUrls = [];

        if (typeof item.imageUrl === "string") {
          try {
            imageUrls = JSON.parse(item.imageUrl);
          } catch (error) {
            console.error("Failed to parse imageUrl:", error);
          }
        } else if (Array.isArray(item.imageUrl)) {
          imageUrls = item.imageUrl;
        }

        const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

        return (
          <Card
            key={item.id}
            className="shadow-lg p-0 hover:shadow-xl transition relative group"
          >
            <CardContent className="flex flex-col p-3">
              {firstImageUrl && (
                <div className="relative w-full h-[160px] rounded overflow-hidden mb-2">
                  <Image
                    src={firstImageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="text-lg font-semibold">{item.name}</h2>
              <span className="text-sm text-gray-500">{item.category}</span>
              <span className="text-sm font-bold text-primary">${item.price.toString()}</span>

              <div className="flex flex-row justify-between items-center mt-2">
                <span
                  className={`text-xs ${
                    item.status === "AVAILABLE" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.status}
                </span>
                <Edit size={18} />
              </div>

              <Button
                className="mt-4 w-full"
                onClick={() => dispatch(addItem(item, item.id))}
                disabled={item.status !== "AVAILABLE"}
              >
                Add to Order
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
