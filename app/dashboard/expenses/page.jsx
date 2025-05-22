"use client";

import { columns } from "./columns";
import { DataTable } from "../expenses/data-table";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { PlusCircle } from "lucide-react";
import { Add } from "./_components/add";

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);

  const { data, isLoading, isError } = useFetch("/api/expense", ["expenses"]);

  const isEmpty = !data || data.length === 0;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-3 mb-4">
            <PlusCircle className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No expenses found</h3>
          <p className="text-gray-500 mb-4 max-w-md">
            You haven't added any expenses yet. Start tracking your expenses by adding your first entry.
          </p>
          <div className="mt-2">
            <Add />
          </div>
        </div>
      ) : isError ? (
        <div className="text-center py-8">
          <p className="text-red-500">Error fetching expenses. Please try again later.</p>
        </div>
      ) : (
        <DataTable data={data} columns={tableColumns} />
      )}
    </div>
  );
}