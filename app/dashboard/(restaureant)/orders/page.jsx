"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import OrderCardList from "./_components/OrderCardList";

const STATUS_OPTIONS = ["PENDING", "IN_PROGRESS", "SERVED", "CANCELLED"];

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  

  const { data, isLoading, isError } = useFetch("/api/orders", ["orders"]); // always called

  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [searchId, setSearchId] = useState("");

    const { user, status } = useSelector((state) => state.user);
  
    // ❌ Show nothing while loading
    if (status === 'loading' || !user) return null;
  
    // ✅ Redirect immediately if user role is not allowed
    if (user.role !== 'WAITER' && user.role !== 'ADMIN') {
      router.push('/');
      return null;
    }
  

  const filteredData = data.filter((order) => {
    const matchStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchSearch =
      searchId.trim() === "" ||
      order.id.toLowerCase().includes(searchId.trim().toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded ${
              statusFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded ${
                statusFilter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {status
                .replace("_", " ")
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by order ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 w-full md:w-64"
        />
      </div>

      <OrderCardList data={filteredData} />
    </div>
  );
}
