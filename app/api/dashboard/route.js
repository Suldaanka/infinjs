// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { 
  BookingStatus, 
  RoomStatus, 
  OrderStatus, 
  TableStatus,
  MenuItemStatus,
  Role
} from '@prisma/client';

export async function GET() {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Hotel section
    const totalRooms = await prisma.room.count();
    const occupiedRooms = await prisma.room.count({ 
      where: { status: RoomStatus.OCCUPIED } 
    });
    
    const todaysCheckins = await prisma.booking.count({
      where: {
        checkIn: { gte: todayStart, lte: todayEnd },
        status: BookingStatus.CONFIRMED
      }
    });
    
    const todaysCheckouts = await prisma.booking.count({
      where: {
        checkOut: { gte: todayStart, lte: todayEnd },
        status: BookingStatus.COMPLETED
      }
    });
    
    const totalGuests = await prisma.booking.count({
      where: {
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
        checkOut: { gt: new Date() }
      }
    });
    
    // Get active bookings with room details to calculate revenue
    const activeBookings = await prisma.booking.findMany({
      where: {
        status: BookingStatus.CONFIRMED
      },
      include: {
        room: true
      }
    });

    // Calculate room revenue based on room prices
    const roomRevenue = activeBookings.reduce((total, booking) => {
      // Get the room price from the related room
      const roomPrice = booking.room?.price || 0;
      return total + Number(roomPrice);
    }, 0);

    // Restaurant section
    const totalTables = await prisma.table.count();
    const occupiedTables = await prisma.table.count({ 
      where: { status: TableStatus.OCCUPIED } 
    });
    
    const todaysOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: todayStart, lte: todayEnd },
        status: { not: OrderStatus.CANCELLED }
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });
    
    const totalMenuItems = await prisma.menuItem.count();
    const outOfStockItems = await prisma.menuItem.count({ 
      where: { status: MenuItemStatus.OUT_OF_STOCK } 
    });

    // Process today's orders revenue and covers
    let todaysRevenue = 0;
    let todaysCovers = 0;

    todaysOrders.forEach(order => {
      todaysRevenue += Number(order.total || 0);
      if (order.items) {
        order.items.forEach(item => {
          todaysCovers += (item.quantity || 0);
        });
      }
    });

    const avgSpend = todaysCovers > 0 
      ? todaysRevenue / todaysCovers
      : 0;

    // Get popular items
    const popularItemsData = await prisma.orderItem.groupBy({
      by: ['menuItemId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 3
    });

    // Get menu item details
    const menuItemIds = popularItemsData.map(item => item.menuItemId);
    const menuItems = menuItemIds.length > 0 
      ? await prisma.menuItem.findMany({
          where: {
            id: { in: menuItemIds }
          }
        })
      : [];

    // Match popular items with their details
    const popularItems = popularItemsData.map(item => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      return {
        id: item.menuItemId,
        name: menuItem?.name || 'Unknown item',
        orders: item._sum.quantity || 0
      };
    });

    // Staff section
    const staffCount = await prisma.user.count({ 
      where: { role: Role.STAFF } 
    });

    // Combine all data
    return NextResponse.json({
      hotel: {
        occupancyRate: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
        totalGuests,
        todaysCheckins,
        todaysCheckouts,
        availableRooms: totalRooms - occupiedRooms,
        roomRevenue
      },
      restaurant: {
        todaysCovers,
        tableOccupancy: totalTables > 0 ? Math.round((occupiedTables / totalTables) * 100) : 0,
        avgSpend: parseFloat(avgSpend.toFixed(2)),
        totalOrders: todaysOrders.length,
        popularItems,
        menuItems: {
          total: totalMenuItems,
          outOfStock: outOfStockItems
        }
      },
      staff: {
        total: staffCount
      },
      combined: {
        totalRevenue: roomRevenue + todaysRevenue,
        inventoryAlerts: outOfStockItems
      },
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}