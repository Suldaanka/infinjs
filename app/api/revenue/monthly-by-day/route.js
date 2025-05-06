import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req) {
  const monthStr = req.nextUrl.searchParams.get('month') // format: YYYY-MM
  if (!monthStr) return NextResponse.json({ error: 'Missing month param' }, { status: 400 })

  const [year, month] = monthStr.split('-').map(Number)
  const start = new Date(year, month - 1, 1)
  const end = new Date(year, month, 1)

  const bookings = await prisma.booking.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
      status: 'CONFIRMED',
    },
    include: {
      room: true,
    },
  })

  const revenueMap = {}

  for (const booking of bookings) {
    const createdAt = new Date(booking.createdAt)
    const dateKey = createdAt.toISOString().split('T')[0] // format: YYYY-MM-DD

    const nights =
      (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)
    const revenue = booking.room.price * nights

    if (!revenueMap[dateKey]) {
      revenueMap[dateKey] = 0
    }
    revenueMap[dateKey] += revenue
  }

  const dailyRevenue = Object.entries(revenueMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({ date, revenue }))

  const totalRevenue = dailyRevenue.reduce((acc, cur) => acc + cur.revenue, 0)

  return NextResponse.json({ month: monthStr, dailyRevenue, totalRevenue })
}
