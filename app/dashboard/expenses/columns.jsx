import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Update } from "./_components/update";


export const columns = (queryClient) => [
  { accessorKey: "description", header: "Description" },
  { accessorKey: "categoryName", header: "Category" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false); // <-- control dialog open state
      const expenses = row.original;
      const id = expenses.id;

      const handleDelete = async () => {
        const res = await fetch(`/api/expense/delete/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ["expenses"] });
        } else {
          alert(data.error || "Failed to delete");
        }
      };

      return (
        <>
          <div className="flex flex-row">
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Open menu</span>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <div>
 
      <Update expenses={expenses} />
   </div>

    <DropdownMenuSeparator />
    
    <DropdownMenuItem onClick={() => handleDelete(id)}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> 
          </div>
        </>
      );
    },
  },
];
