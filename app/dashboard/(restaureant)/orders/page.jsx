"use client";

import { columns } from "./_components/columns";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { DataTable } from "../../expenses/data-table";
import OrderCardList from "./_components/OrderCardList";
import { NewOrder } from "./_components/newOrder";



export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);

  const { data, isLoading, isError } = useFetch("/api/orders", ["orders"]);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error fetching expenses</p>;

  console.log(data, "data from orders page");

  return (
    <div>
      <NewOrder/>
      <OrderCardList data={data.orders}/>
    </div>
  );
}
