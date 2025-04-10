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






export   const columns  = (queryClient) => [
  
  { accessorKey: "number", header: "Number" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "type", header: "Type" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({row}) =>{
      const status = row.getValue()
      
    }
  },
  {
    accessorKey: "actions", header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const expenses = row.original

      const id = row.original.id;

      const handleDelete = async () => {
        const res = await fetch(`/api/expense/delete/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ["expenses"] });
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
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(expenses.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
