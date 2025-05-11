"use client";

import { columns } from "./_components/columns";
import { DataTable } from "../expenses/data-table";
import { useFetch } from "@/hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import { Addreservation } from "./_components/add";
import { useAuth } from "@clerk/nextjs";

export default function Page() {
  const queryClient = useQueryClient();
  const tableColumns = columns(queryClient);
  const { data, isLoading, isError } = useFetch("/api/reservation", ["reservation"]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading reservation data</div>;
  if (!data) return <div>No reservation data found</div>;


  const updatedReservations = data.map((reservation) => {
    // Create a safe date formatting function
    const formatDate = (dateString) => {
      try {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
      } catch (e) {
        return "Invalid Date";
      }
    };

    return {
      ...reservation,
      checkIn: formatDate(reservation.checkIn),
      checkOut: formatDate(reservation.checkOut),
    };
  });

  return (
    <div>
      <Addreservation />
      <DataTable data={updatedReservations} columns={tableColumns} />
    </div>
  );
}