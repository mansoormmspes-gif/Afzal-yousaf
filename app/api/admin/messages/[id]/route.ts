import { NextResponse } from "next/server";
import { deleteMessage } from "@/lib/contact";
import { cookies } from "next/headers";

async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get("admin_token")?.value === "authenticated";
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
        }

        deleteMessage(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }
}
