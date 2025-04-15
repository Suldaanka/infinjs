import React from 'react'

export default function TableCard({ data }) {
    // Check if data is an array
    if (!Array.isArray(data)) {
      console.warn("Expected data to be an array but got:", data);
      return <p>No tables to display</p>;
    }
  
    return (
      <div >
        <div className='flex flex-row flex-wrap gap-4 w-full h-full'>
        {data.map((table) => (
          <div key={table.id} className="border p-4 mb-2 rounded">
            <h2>Table #{table.number}</h2>
            <p>Capacity: {table.capacity}</p>
            <p className={table.status === "occupied" ? "text-red-500" : "text-green-500"}>Status: {table.status}</p>
          </div>
        ))}
        </div>
      </div>
    );
  }
  
