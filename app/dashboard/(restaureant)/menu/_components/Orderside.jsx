'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '@/redux/features/order/orderSlice';
import { useMutate } from '@/hooks/useMutate';
import { toast } from 'sonner';
export default function Orderside() {
  const orders = useSelector((state) => state.order.items);
  const user = useSelector((state) => state.user.user);
  const rooms = useSelector((state)=> state.room.room)
  const tables = useSelector((state)=> state.table.table)
  const [destination, setDestination] = useState('table');
  const [destinationNumber, setDestinationNumber] = useState('');

  /* const roomNumbers = rooms?.map((room) => room.number);
  const tableNumbers = tables?.map((table) => table.number); */
  
  console.log("rooms and tables",rooms?.number,tables?.number)
  const subtotal = orders.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const userId = user?.id;
  const dispatch = useDispatch();
  const { mutate } = useMutate(`/api/orders/add`,['orders'], { method: 'POST',});

  function addOrder() {
    const orderData = {
      userId,
      tableId: destination === 'table' ? destinationNumber : null,
      roomId: destination === 'room' ? destinationNumber : null,
      status: 'PENDING',
      total: parseFloat(total.toFixed(2)),
      items: orders.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: parseFloat(item.price)
      }))
    };

    console.log('Order placed:', orderData);

    mutate(orderData, {
      onSuccess: () => {
        toast.success('Order placed successfully!');
        dispatch({ type: 'order/clear' });
        setDestinationNumber('');
      },
      onError: (error) => {
        console.error('Error placing order:', error);
        toast.error('Order placed successfully!');
      }
    });
     
  }

  return (
    <div className="border-l w-80 bg-sidebar flex flex-col h-full">
      <div className="px-3 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        {/* 3-dot destination select */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-2">
            <div
              onClick={() => setDestination('table')}
              className={`cursor-pointer px-2 py-1 rounded hover:bg-muted ${destination === 'table' ? 'bg-muted font-semibold' : ''}`}
            >
              Table
            </div>
            <div
              onClick={() => setDestination('room')}
              className={`cursor-pointer px-2 py-1 rounded hover:bg-muted ${destination === 'room' ? 'bg-muted font-semibold' : ''}`}
            >
              Room
            </div>
          </PopoverContent>
        </Popover>

      </div>
      <div className='px-2'>
        <select
          className="w-full p-2 border rounded"
          value={destinationNumber}
          onChange={(e) => setDestinationNumber(e.target.value)}
        >
          <option value="">
            Select {destination === 'table' ? 'Table' : 'Room'} Number
          </option>
          {(destination === 'table' ? tables : rooms)?.map((num) => (
            <option key={num.id} value={num.id}>
              {destination === 'table' ? `Table ${num.number}` : `Room ${num.number}`}
            </option>
          ))}
        </select>
      </div>


      <div className="flex-grow overflow-auto px-3">
        {orders.length > 0 ? (
          orders.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  ${item.price} x {item.quantity}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</Button>
                <span>{item.quantity}</span>
                <Button variant="outline" size="sm" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</Button>
                <Button variant="ghost" size="sm" onClick={() => dispatch(removeItem(item.id))}>✕</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No items in order</div>
        )}
      </div>

      <div className="mt-auto border-t p-3 space-y-4">
        {/* Totals */}
        <div className="text-right text-sm">
          <div>Sub Total: ${subtotal.toFixed(2)}</div>
          <div>Tax 5%: ${tax.toFixed(2)}</div>
          <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
        </div>

        {/* Submit */}
        <Button
          className="w-full"
          onClick={addOrder}
          disabled={orders.length === 0 || !destinationNumber}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
