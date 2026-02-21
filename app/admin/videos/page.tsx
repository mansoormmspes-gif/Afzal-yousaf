"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import styles from "../dashboard/dashboard.module.css";
import { Video } from "@/lib/videos";

export default function VideosDashboard() {
    const [videos, setVideos] = useState<Video[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        try {
            const res = await fetch(`/api/videos/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setVideos(videos.filter((v) => v.id !== id));
            } else {
                alert("Failed to delete video");
            }
        } catch (error) {
            alert("Error deleting video");
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/dashboard" className={styles.actionBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>Video Management</h1>
                </div>
                <div className={styles.actions}>
                    <Link href="/" className={styles.homeLink}>
                        View Site
                    </Link>
                </div>
            </header>

            <div className={styles.mainAction}>
                <Link href="/admin/videos/editor" className={styles.createBtn}>
                    <Plus size={20} /> Add New Video
                </Link>
            </div>

            <div className={styles.postsList}>
                <div className={styles.listHeader}>
                    <span>Title</span>
                    <span>Date</span>
                    <span>Link</span>
                    <span>Actions</span>
                </div>

                {videos.length === 0 ? (
                    <p className={styles.empty}>No videos found.</p>
                ) : (
                    videos.map((video) => (
                        <div key={video.id} className={styles.postItem}>
                            <div className={styles.postTitle}>{video.title}</div>
                            <div>{video.date}</div>
                            <div>
                                <a href={video.youtubeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                                    Watch
                                </a>
                            </div>
                            <div className={styles.postActions}>
                                <Link href={`/admin/videos/editor/${video.id}`} className={styles.actionBtn}>
                                    <Edit size={18} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(video.id)}
                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
