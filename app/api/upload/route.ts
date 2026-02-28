import { NextResponse } from "next/server";
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
        const file = data.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dzjzwhvgq";
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "afza yusuf";

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        // Prepare FormData for Cloudinary
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", file);
        cloudinaryData.append("upload_preset", uploadPreset);

        // Upload to Cloudinary
        const uploadRes = await fetch(cloudinaryUrl, {
            method: "POST",
            body: cloudinaryData,
        });

        const uploadData = await uploadRes.json();

        if (uploadRes.ok && uploadData.secure_url) {
            return NextResponse.json({ success: true, url: uploadData.secure_url });
        } else {
            console.error("Cloudinary upload failed:", uploadData);
            return NextResponse.json(
                { error: `Cloudinary error: ${uploadData.error?.message || "Unknown"}` },
                { status: uploadRes.status || 500 }
            );
        }

    } catch (error: any) {
        console.error("Upload error details:", error);
        return NextResponse.json(
            { error: `Failed to upload file to Cloudinary: ${error.message || "Unknown server error"}` },
            { status: 500 }
        );
    }
}
