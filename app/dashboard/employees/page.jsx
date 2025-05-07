"use client";

import { columns } from "./_components/columns";
import { DataTable } from "../expenses/data-table";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);
  const { data, isLoading, isError } = useFetch("/api/users", ["users"]);

  if (isLoading || !data) return <Loading />;
  if (isError) return <div>Error loading users data</div>;
  if (!data) return <div>No users data found</div>;

  console.log("users data", data);

  return (
    <div>
      <DataTable data={data} columns={tableColumns} />
    </div>
  );
}