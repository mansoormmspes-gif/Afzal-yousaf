import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { password } = body;

    // In a real app, use environment variables and proper hashing
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });

        // Set a cookie
        response.cookies.set("admin_token", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    }

    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("admin_token");
    return response;
}
