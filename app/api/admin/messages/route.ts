import { NextResponse } from "next/server";
import { getMessages, deleteMessage } from "@/lib/contact";

export const dynamic = "force-dynamic"; // Ensure API doesn't cache the JSON response
import { cookies } from "next/headers";

// Helper to check authentication
async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get("admin_token")?.value === "authenticated";
}

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const messages = getMessages();
        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}
