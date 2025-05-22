import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, context) {
        const params = await context.params;
        const userId = params.id;
    
    try {
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });
        
        if (!user) {
            return NextResponse.json(
                { error: "User not found" }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}