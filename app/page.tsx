import Link from "next/link";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import VideoCard from "@/components/VideoCard";
import { getPosts, Post } from "@/lib/posts";
import { getVideos, Video } from "@/lib/videos";

export const dynamic = "force-dynamic";

type StoryItem =
  | { type: "post"; data: Post; dateStr: string }
  | { type: "video"; data: Video; dateStr: string };

export default async function Home() {
  const [posts, videos] = await Promise.all([
    getPosts(),
    getVideos()
  ]);

  const combinedItems: StoryItem[] = [
    ...posts.map(post => ({ type: "post" as const, data: post, dateStr: post.date })),
    ...videos.map(video => ({ type: "video" as const, data: video, dateStr: video.date }))
  ];

  // Sort descending by creation timestamp (id)
  combinedItems.sort((a, b) => Number(b.data.id) - Number(a.data.id));

  // Show top 6 latest items
  const topItems = combinedItems.slice(0, 6);

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <Hero />

      <section id="latest-posts" style={{ marginTop: "2rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "2rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1rem"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Latest Stories</h2>
          <Link href="/blog" style={{ fontSize: "0.9rem", color: "var(--muted-foreground)", transition: "color 0.2s" }}>
            View all →
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
        }}>
          {topItems.map((item, index) => (
            <div key={`${item.type}-${item.data.id}`}>
              {item.type === "post" ? (
                <PostCard post={item.data} />
              ) : (
                <VideoCard video={item.data} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
