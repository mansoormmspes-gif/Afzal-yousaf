import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    // Basic auth check
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("admin_token");

    if (authCookie?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload directory in public folder
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error: any) {
            console.error("MKDIR Error:", error.message || error);
            // We ignore EEXIST but other errors might be permissions issues
        }

        // Generate unique filename to avoid overwrites
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.name || "image.jpg");
        const filename = `about-${uniqueSuffix}${ext}`;
        const filePath = path.join(uploadDir, filename);

        // Save file
        await writeFile(filePath, buffer);

        // Return the public URL
        const fileUrl = `/uploads/${filename}`;

        return NextResponse.json({ success: true, url: fileUrl });
    } catch (error: any) {
        console.error("Upload error details:", error);
        return NextResponse.json(
            { error: `Failed to upload file: ${error.message || "Unknown server error"}` },
            { status: 500 }
        );
    }
}
