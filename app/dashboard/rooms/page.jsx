"use client";

import { columns } from "./_components/columns";
import { DataTable } from "../expenses/data-table";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);

  const { data, isLoading, isError } = useFetch("/api/rooms", ["rooms"]);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching Rooms</p>;

  return (
    <div>
      <DataTable data={data || []} columns={tableColumns} />
    </div>
  );
}