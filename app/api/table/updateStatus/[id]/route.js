import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 


export default async function handler(req, NextResponse) {
    // Only allow PATCH method for updating
    if (req.method !== 'PATCH') {
      return NextResponse.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const tableId = req.query.id;
      const { status } = req.body;
  
      // Validate required fields
      if (!status) {
        return NextResponses.status(400).json({ message: 'Status is required' });
      }
  
      // Validate status values
      if (!['available', 'occupied'].includes(status)) {
        return NextResponse.status(400).json({ message: 'Status must be either "available" or "occupied"' });
      }

      
       const updatedTable = await prisma.table.update({
         where: { id: parseInt(tableId) },
         data: { status: status.toUpperCase() },
       })
  
  
      return res.status(200).json(updatedTable);
    } catch (error) {
      console.error('Error updating table status:', error);
      return res.status(500).json({ message: 'Error updating table status', error: error.message });
    }
  }