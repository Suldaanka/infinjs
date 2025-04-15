"use client";

import { columns } from "./columns";
import { DataTable } from "../expenses/data-table";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/user/userSlice";

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);

  const user = useSelector((state) => state.user.user); // ✅ safe now

  const { data, isLoading, isError } = useFetch("/api/expense", ["expenses"]);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching expenses</p>;

  return (
    <div>
      <span>{user}</span>
      <DataTable data={data || []} columns={tableColumns} />
    </div>
  );
}
