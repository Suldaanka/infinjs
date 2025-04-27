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
  const rooms = useSelector((state) => state.room.room);

  if (isLoading || !rooms) return <Loading />;
  if (isError) return <div>Error loading reservation data</div>;
  if (!data) return <div>No reservation data found</div>;

  // 1. Create a map: roomId -> roomNumber
  const roomNumberMap = {};
  rooms.forEach((room) => {
    roomNumberMap[room.id] = room.number;
  });

  // 2. Attach roomNumber to each reservation
  const updatedReservations = data.map((reservation) => ({
    ...reservation,
    roomNumber: roomNumberMap[reservation.roomId] || "Unknown", // fallback if no match
  }));

  console.log("Reservations with Room Numbers:", updatedReservations);

  return (
    <div>
      <Addreservation />
      <DataTable data={updatedReservations} columns={tableColumns} />
    </div>
  );
}
