import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/contact";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newMessage = await saveMessage({
            name: body.name,
            email: body.email,
            message: body.message,
        });

        return NextResponse.json(
            { success: true, message: "Message sent successfully", data: newMessage },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving contact message:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
