import { NextResponse } from "next/server";
import process from "process";
import fs from "fs";
import path from "path";

export async function GET() {
    const cwd = process.cwd();
    const dataPath = path.join(cwd, "data");
    let dataDirContents: string[] = [];
    let postsContent = "Not read";

    try {
        if (fs.existsSync(dataPath)) {
            dataDirContents = fs.readdirSync(dataPath);
            const postsPath = path.join(dataPath, "posts.json");
            if (fs.existsSync(postsPath)) {
                postsContent = fs.readFileSync(postsPath, "utf-8").substring(0, 100) + "...";
            }
        }
    } catch (e) {
        postsContent = "Error: " + e;
    }

    return NextResponse.json({
        cwd,
        dataPath,
        dataDirExists: fs.existsSync(dataPath),
        dataDirContents,
        postsContent
    });
}
