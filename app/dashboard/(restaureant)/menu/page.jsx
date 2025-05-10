"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "./_components/menuCard";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { AddMenuItem } from "./_components/addMenuItem";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const { data: menuItems, isLoading, isError } = useFetch("/api/menu", ["menu"]);
  const [addMenu, setAddMenu] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Extract unique categories when data loads
  const categories = menuItems ? 
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
  if (isError) return <p>Error fetching menu items</p>;

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

        {!addMenu && (
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
          <AddMenuItem />
        ) : (
          <MenuCard menuItems={filteredItems} />
        )}
      </div>
    </div>
  );
}