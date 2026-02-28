import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

        // Generate a random unique file name
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        // The file.name property might not exist, but file.type is usually trustworthy.
        let ext = "";
        if (file.name && file.name.includes('.')) {
            ext = "." + file.name.split('.').pop();
        } else if (file.type) {
            ext = "." + file.type.split('/')[1];
        } else {
            ext = ".jpg";
        }

        const filename = `uploads/about-${uniqueSuffix}${ext}`;

        // Reference in Firebase Storage where the file will be uploaded
        const storageRef = ref(storage, filename);

        // Setup metadata so Firebase sets the correct HTTP headers publicly
        const metadata = {
            contentType: file.type || "image/jpeg",
        };

        // Upload the bytes directly
        const snapshot = await uploadBytes(storageRef, new Uint8Array(bytes), metadata);

        // Get the valid public URL
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return NextResponse.json({ success: true, url: downloadUrl });
    } catch (error: any) {
        console.error("Upload error details:", error);
        return NextResponse.json(
            { error: `Failed to upload file to Firebase: ${error.message || "Unknown server error"}` },
            { status: 500 }
        );
    }
}
