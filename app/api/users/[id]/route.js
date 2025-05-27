import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, context) {
    const params = await context.params;
    const userId = params.id;

    try {
        let user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        // If user doesn't exist, create them with default role
        if (!user) {
            user = await prisma.user.create({
                data: {
                    clerkId: userId,
                    role: 'USER', // or whatever default role you want
                    // add other required fields if needed
                },
            });
            console.log('Created new user with default role:', user);
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching/creating user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}