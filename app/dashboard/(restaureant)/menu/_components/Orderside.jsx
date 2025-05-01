import { Button } from '@/components/ui/button';
import React from 'react'

export default function Orderside({orderItems, onUpdateQuantity, onRemove}) {
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
  
    return (
      <div className="border-l-2 bg-sidebar h-[calc(100%-4rem)] px-3">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">
                ${item.price} x {item.quantity}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
              <span>{item.quantity}</span>
              <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
              <Button variant="ghost" size="sm" onClick={() => onRemove(item.id)}>✕</Button>
            </div>
          </div>
        ))}
  
        <div className="mt-4 text-right text-sm">
          <div>Sub Total: ${subtotal.toFixed(2)}</div>
          <div>Tax 5%: ${tax.toFixed(2)}</div>
          <div className="font-bold text-lg">Total: ${(subtotal + tax).toFixed(2)}</div>
        </div>
  
        <Button className="w-full mt-4">Place Order</Button>
      </div>
    );
}
