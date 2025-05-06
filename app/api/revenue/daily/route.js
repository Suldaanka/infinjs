// app/api/dashboard/revenue/daily/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req) {
  const dateStr = req.nextUrl.searchParams.get('date')
  if (!dateStr) return NextResponse.json({ error: 'Missing date param' }, { status: 400 })

  const start = new Date(dateStr)
  const end = new Date(dateStr)
  end.setDate(end.getDate() + 1)

  const bookings = await prisma.booking.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
      status: 'CONFIRMED', // optional: only include paid bookings
    },
    include: {
      room: true, // get room.price
    },
  })

  let totalRevenue = 0
  for (const booking of bookings) {
    const nights =
      (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)
    totalRevenue += booking.room.price * nights
  }

  return NextResponse.json({ date: dateStr, totalRevenue })
}
