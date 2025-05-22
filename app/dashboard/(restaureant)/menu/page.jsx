"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "./_components/menuCard";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { AddMenuItem } from "./_components/addMenuItem";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function Page() {
  const { data: menuItems, isLoading, isError } = useFetch("/api/menu", ["menu"]);
  const [addMenu, setAddMenu] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Extract unique categories when data loads
  const categories = menuItems && menuItems.length > 0 ? 
    ["all", ...new Set(menuItems.map(item => item.category))] : 
    ["all"];

  // Update filtered items when category changes or data loads
  useEffect(() => {
    if (menuItems) {
      if (activeCategory === "all") {
        setFilteredItems(menuItems);
      } else {
        setFilteredItems(menuItems.filter(item => item.category === activeCategory));
      }
    }
  }, [activeCategory, menuItems]);

  if (isLoading) return <Loading />;
  
  // Show empty state instead of error when there are no menu items
  const isEmpty = !menuItems || menuItems.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1">
        <div className="pb-7 flex justify-between items-center">
          {addMenu ? (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAddMenu(!addMenu)}>
              <ArrowLeft className="cursor-pointer" /> <span>Back to Menu</span>
            </div>
          ) : (
            <Button onClick={() => setAddMenu(!addMenu)} className="mb-4">
              Add Item
            </Button>
          )}
        </div>

        {!addMenu && !isEmpty && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {addMenu ? (
          <AddMenuItem setAddMenu={setAddMenu} />
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <PlusCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No menu items found</h3>
            <p className="text-gray-500 mb-4 max-w-md">
              Your menu is currently empty. Add your first menu item to get started.
            </p>
            <Button onClick={() => setAddMenu(true)}>
              Add Your First Menu Item
            </Button>
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error fetching menu items. Please try again later.</p>
          </div>
        ) : (
          <MenuCard menuItems={filteredItems} />
        )}
      </div>
    </div>
  );
}