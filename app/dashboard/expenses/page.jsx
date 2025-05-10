"use client";

import { columns } from "./columns";
import { DataTable } from "../expenses/data-table";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);

  const { data, isLoading, isError } = useFetch("/api/expense", ["expenses"]);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching expenses</p>;

  return (
    <div>
      <DataTable data={data || []} columns={tableColumns} />
    </div>
  );
}
