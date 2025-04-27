"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "./_components/menuCard";
import { AddMenuItem } from "./_components/addMenuItem";


export default function Page() {
  const [menuItem, setMenuItem] = useState([]);

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
    <div>
      <MenuCard menuItems={menuItem}/>
    </div>
  );
}
