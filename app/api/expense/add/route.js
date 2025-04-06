import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Received body:", body);

        // Extract fields from body
        const { description, category, amount, paidById } = body;

        // Validate required fields
        if (!description || !category || !amount) {
            return NextResponse.json(
                { error: "Missing required fields: description, category, and amount are required" },
                { status: 400 }
            );
        }

        // Create expense with the correct fields according to your Prisma model
        const expense = await prisma.expense.create({
            data: {
                description,
                category,
                amount: parseFloat(amount),
                paidById: paidById || null,
                // date, createdAt, and updatedAt will be set automatically by Prisma
            }
        });

        return NextResponse.json({ expense }, { status: 201 });
    } catch (error) {
        console.error("Error creating expense:", error);
        return NextResponse.json(
            { error: `Error creating expense: ${error.message}` },
            { status: 500 }
        );
    }
}