import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/settings";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const settings = await getSettings();
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    // Basic auth check
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("admin_token");

    if (authCookie?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();
        await updateSettings(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update settings" },
            { status: 500 }
        );
    }
}
