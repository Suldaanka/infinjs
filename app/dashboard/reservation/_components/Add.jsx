import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReservationForm,} from "./reservationForm"

export function Addreservation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add reservation</DialogTitle>
        </DialogHeader>
        <ReservationForm/>
      </DialogContent>
    </Dialog>
  )
}
