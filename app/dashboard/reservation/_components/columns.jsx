"use client"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { queryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Update } from "./update";






export   const columns  = (queryClient) => [
  
  { accessorKey: "fullName", header: "Full Name" },
  { accessorKey: "roomNumber", header: "Room" },
  { accessorKey: "checkIn", header: "checkIn" },
  { accessorKey: "checkOut", header: "checkOut" },
  { 
    accessorKey: "status", 
    header: "Status"},
  {
    accessorKey: "actions", header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const reservation = row.original

      const id = row.original.id;

      const handleDelete = async () => {
        const res = await fetch(`/api/reservation/delete/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ["reservation"] });
        } else {
          alert(data.error || "Failed to delete");
        }
      };
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Update reservation={reservation}/>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(reservation.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
