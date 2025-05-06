"use client";

import { useState } from "react";
import { columns } from "./_components/columns";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { DataTable } from "../../expenses/data-table";
import OrderCardList from "./_components/OrderCardList";

const STATUS_OPTIONS = ["PENDING", "IN_PROGRESS", "SERVED", "CANCELLED"];

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);

  const { data, isLoading, isError } = useFetch("/api/orders", ["orders"]);

  const [statusFilter, setStatusFilter] = useState("PENDING"); // Default to PENDING
  const [searchId, setSearchId] = useState("");

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching orders</p>;

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
              {status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())}
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
