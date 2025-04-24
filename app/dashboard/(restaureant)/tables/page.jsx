"use client"

import React from 'react'
import TableCard from './_components/tableCard'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { AddTable } from './_components/Add'
const [tables, setTables] = useState([]);
const [loading, setLoading] = useState(true);


export default function page() {
  const { data, isLoading, isError } = useFetch('/api/table', ['tables'])
  if (isLoading) return <Loading />
  if (isError) return <p>Error fetching tables</p>

  const handleStatusChange = (tableId, newStatus) => {
    // Update your API
    fetch(`/api/tables/${tableId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
    .then(response => response.json())
    .then(data => {
      // Update local state
      setTables(tables.map(table => 
        table.id === tableId ? {...table, status: newStatus} : table
      ));
    })
    .catch(error => {
      console.error('Error updating table status:', error);
    });
  };
  return (
    <div>
      <AddTable/>
      <TableCard 
        data={loading ? null : tables} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  )
}
