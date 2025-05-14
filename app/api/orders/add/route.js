import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path if needed
import { Decimal } from "@prisma/client/runtime/library"; // required for Decimal type

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, tableId, roomId, items, total, status } = body;

    if (!Array.isArray(items) || items.length === 0 || !total) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        tableId,
        roomId,
        status: status || "PENDING",
        total: new Decimal(total),
        items: {
          create: items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: new Decimal(item.price),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
