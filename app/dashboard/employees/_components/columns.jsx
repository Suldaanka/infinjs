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




export   const columns  = (queryClient) => [
  
  { accessorKey: "name", header: "Full Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
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
