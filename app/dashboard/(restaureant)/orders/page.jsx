"use client";

import { useState } from "react";
import { columns } from "./_components/columns";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { DataTable } from "../../expenses/data-table";
import OrderCardList from "./_components/OrderCardList";

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);

  const { data, isLoading, isError } = useFetch("/api/orders", ["orders"]);
  const [statusFilter, setStatusFilter] = useState("all");

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching orders</p>;

  const filteredData =
    statusFilter === "all"
      ? data
      : data.filter((order) => order.status === statusFilter);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 rounded ${statusFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter("pending")}
          className={`px-4 py-2 rounded ${statusFilter === "PENDING" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatusFilter("in process")}
          className={`px-4 py-2 rounded ${statusFilter === "IN_PROGRESS" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          In Process
        </button>
        <button
          onClick={() => setStatusFilter("other")}
          className={`px-4 py-2 rounded ${statusFilter === "other" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Other
        </button>
      </div>

      <OrderCardList data={filteredData} />
    </div>
  );
}
