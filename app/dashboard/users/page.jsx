"use client"

import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { DataTable } from '../expenses/data-table';
import { columns } from './_components/columns';

export default function page() {
    const {data, isLoading} = useFetch('/api/users', ["users"]);

    
  return (
    <div>
      <DataTable data={data} columns={columns}/>
    </div>
  )
}
