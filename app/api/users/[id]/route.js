import { NextResponse } from "next/server";

export async function GET(request, context) {
    const params = await context.params;
    const userId = params.id;
    
    try {
        const User = await prisma.user.findUnique({where: {clerkId: userId}})
        if (!User) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }
        return NextResponse.json(User, {status: 200})
    } catch (error) {
        return NextResponse.json(
            {error: "Something went wrong"},
            {status: 500}
        );
    }
}