"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "./_components/menuCard";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";


export default function Page() {
  const { data:menuItem, isLoading, isError } = useFetch("/api/menu", ["menu"]);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching menu Items</p>;

 
  return (
    <div className="flex gap-4">
    <div className="flex-1">
      <MenuCard menuItems={menuItem} />
    </div>
  </div>
  );
}
