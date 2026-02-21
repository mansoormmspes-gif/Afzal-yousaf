import styles from "./page.module.css";
import VideoCard from "@/components/VideoCard";
import { getVideos } from "@/lib/videos";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Videos | Afzal yousaf",
    description: "Watch the latest videos from Afzal yousaf.",
};

export const revalidate = 0; // Ensure fresh data on every request

export default async function VlogsPage() {
    const videos = await getVideos();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Videos</h1>
                <p className={styles.intro}>
                    Visual storytelling and thoughts in motion.
                </p>
            </header>

            <div className={styles.grid}>
                {videos.length > 0 ? (
                    videos.map((video) => <VideoCard key={video.id} video={video} />)
                ) : (
                    <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--muted-foreground)" }}>
                        No videos found. Check back later!
                    </p>
                )}
            </div>
        </div>
    );
}
