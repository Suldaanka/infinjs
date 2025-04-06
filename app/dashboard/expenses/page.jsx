"use client";
import { columns } from "./columns"

import { useQuery } from "@tanstack/react-query";
import { DataTable, DataTableDemo } from "./data-table";


export default function Page() {
  const fetchExpenses = async () => {
    const res = await fetch("/api/expense");
    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching expenses</p>;

  console.log("Fetched Data:", data); // Debug API response

  // Extract expenses array safely
  const expenses = data?.expenses || [];



  return (
    <div>
      <h1>Expenses</h1>
      <DataTable data={expenses} columns={columns} />
    </div>
  );
}
