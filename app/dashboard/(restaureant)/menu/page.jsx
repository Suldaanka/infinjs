"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "./_components/menuCard";
import { AddMenuItem } from "./_components/addMenuItem";
import Orderside from "./_components/Orderside";




export default function Page() {
  const [menuItem, setMenuItem] = useState([]);

  const [orderItems, setOrderItems] = useState([]);

  const handleAddToOrder = (newItem) => {
    setOrderItems((prev) => {
      const exists = prev.find(i => i.id === newItem.id);
      if (exists) {
        return prev.map(i =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      setOrderItems(items => items.filter(item => item.id !== id));
    } else {
      setOrderItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  console.log(orderItems)

  async function getData(){
    const url = "/api/menu";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return []; // Return an empty array instead of undefined
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setMenuItem(data);
    }
    fetchData();
  }, []);
  

  return (
    <div className="flex gap-4">
    <div className="flex-1">
      <MenuCard menuItems={menuItem} onAddToOrder={handleAddToOrder} />
    </div>
    <div className="w-1/3 h-[calc(100%-h-16)]">
    <Orderside
        orderItems={orderItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  </div>
  );
}
