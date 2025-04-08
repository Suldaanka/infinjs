
"use client";

import { columns } from "./_components/columns";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../expenses/data-table";
export default function Page() {
  const queryClient = useQueryClient();
  
  // Pass queryClient to the columns function
  const tableColumns = columns(queryClient);

  const fetchrooms = async () => {
    const res = await fetch("/api/rooms");
    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchrooms,
    staleTime: 1000 * 60 * 5,
  });

  console.log("Query Data:", data); // Debug API response
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching Rooms</p>;

  console.log("Fetched Data:", data); // Debug API response

  // Extract expenses array safely
  //const expenses = data?.expenses || [];


  return (
    <div>
      <h1>Romms</h1>
      <DataTable data={data} columns={tableColumns} />
    </div>
  );
}
