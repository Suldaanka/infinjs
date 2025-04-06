"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";


export default function MenuCard(menuItems) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {menuItems.items && menuItems.items.map((items) => {
        // Ensure imageUrl is always an array
        const imageUrls = Array.isArray(items.imageUrl) ? items.imageUrl : [items.imageUrl];

        return (
          <Card key={items.id} className="shadow-lg py-4">
            <CardContent className="flex flex-col px-3">
              {imageUrls[1] && (
                <Image
                  src={imageUrls[1].toString()} // Convert to string
                  alt={items.name}
                  width={230}
                  height={200}
                  className="rounded-md object-cover"
                />
              )}
              <h2 className="text-lg font-semibold mt-2">{items.name}</h2>
              <span className="text-sm text-gray-500">{items.category}</span>
              <span className="text-sm font-bold text-primary">${items.price.toString()}</span>
              <div className="flex flex-row justify-between items-center mt-2">
                <span className={`text-xs  ${items.status === "AVAILABLE" ? " text-green-600" : " text-red-600"}`}>
                  {items.status}
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
