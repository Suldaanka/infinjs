"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function MenuCard({ menuItems }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {menuItems && menuItems.map((item) => {
        // Safely parse imageUrl
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
          <Card key={item.id} className="shadow-lg py-4 py-0 pb-4">
            <CardContent className="flex flex-col px-3">
              {firstImageUrl && (
                <div className="relative w-full h-[200px]">
                  <Image
                    src={firstImageUrl}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
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
                <span>
                  <Edit size={18} />
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
