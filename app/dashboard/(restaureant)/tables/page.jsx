"use client"

import TableCard from './_components/tableCard'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { AddTable } from './_components/Add'



export default function page() {
  const { data, isLoading, isError } = useFetch('/api/table', ['tables'])
  if (isLoading) return <Loading />
  if (isError) return <p>Error fetching tables</p>

  return (
    <div>
      <AddTable/>
      <TableCard 
        data={data} 
      />
    </div>
  )
}
