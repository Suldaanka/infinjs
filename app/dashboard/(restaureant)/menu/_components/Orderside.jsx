"use client"

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Orderside({orderItems, onUpdateQuantity, onRemove}) {
    const [destination, setDestination] = useState('table');
    const [destinationNumber, setDestinationNumber] = useState('');
    
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const orders = useSelector((state)=> state.order.items);
    console.log("orders state", orders)

    function addOrder() {
       // Create order object with all relevant data
       const orderData = {
         items: orderItems,
         subtotal: subtotal.toFixed(2),
         tax: tax.toFixed(2),
         total: total.toFixed(2),
         destinationType: destination,
         destinationNumber: destinationNumber
       };
       
       console.log("Order placed:", orderData);
    }
  
    return (
      <div className="border-l w-80 bg-sidebar flex flex-col h-full">
        <div className="px-3 py-4">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        </div>
        
        <div className="flex-grow overflow-auto px-3">
          {orderItems.length > 0 ? (
            orderItems.map((item) => (
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
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No items in order</div>
          )}
        </div>
        
        <div className="mt-auto border-t p-3">
          {/* Destination selection */}
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <Button 
                variant={destination === 'table' ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setDestination('table')}
              >
                Table
              </Button>
              <Button 
                variant={destination === 'room' ? "default" : "outline"} 
                size="sm"
                className="flex-1"
                onClick={() => setDestination('room')}
              >
                Room
              </Button>
            </div>
            <input
              type="number"
              placeholder={destination === 'table' ? "Table Number" : "Room Number"}
              className="w-full p-2 border rounded"
              value={destinationNumber}
              onChange={(e) => setDestinationNumber(e.target.value)}
            />
          </div>
          
          {/* Order totals */}
          <div className="text-right text-sm mb-4">
            <div>Sub Total: ${subtotal.toFixed(2)}</div>
            <div>Tax 5%: ${tax.toFixed(2)}</div>
            <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={addOrder}
            disabled={orderItems.length === 0 || !destinationNumber}
          >
            Place Order
          </Button>
        </div>
      </div>
    );
}