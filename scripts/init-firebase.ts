import { db } from "../lib/firebase";
import { ref, set } from "firebase/database";
import fs from "fs/promises";
import path from "path";

async function initFirebase() {
    try {
        console.log("Migrating JSON data to Firebase RTDB...");

        let posts = [];
        try {
            const postsData = await fs.readFile(path.join(process.cwd(), "data", "posts.json"), "utf8");
            posts = JSON.parse(postsData);
        } catch (e) { }

        let videos = [];
        try {
            const videosData = await fs.readFile(path.join(process.cwd(), "data", "videos.json"), "utf8");
            videos = JSON.parse(videosData);
        } catch (e) { }

        let messages = [];
        try {
            const msgsData = await fs.readFile(path.join(process.cwd(), "data", "messages.json"), "utf8");
            messages = JSON.parse(msgsData);
        } catch (e) { }

        const postsObj = posts.reduce((acc: any, p: any) => { acc[p.id] = p; return acc; }, {});
        const videosObj = videos.reduce((acc: any, v: any) => { acc[v.id] = v; return acc; }, {});
        const messagesObj = messages.reduce((acc: any, m: any) => { acc[m.id] = m; return acc; }, {});

        await set(ref(db, 'posts'), postsObj);
        console.log(`Migrated ${posts.length} posts.`);

        await set(ref(db, 'videos'), videosObj);
        console.log(`Migrated ${videos.length} videos.`);

        await set(ref(db, 'messages'), messagesObj);
        console.log(`Migrated ${messages.length} messages.`);

        console.log("Migration complete.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed", err);
        process.exit(1);
    }
}
initFirebase();
