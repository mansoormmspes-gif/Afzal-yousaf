"use client";

import { useState } from "react";

import styles from "./VideoCard.module.css";
import { Video } from "@/lib/videos";
import { motion } from "framer-motion";

export default function VideoCard({ video }: { video: Video }) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Extract video ID safely
    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(video.youtubeUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -8 }}
            className={styles.cardWrapper}
            style={{ willChange: "transform, opacity" }}
        >
            <div className={styles.card}>
                <div className={styles.videoContainer}>
                    {!videoId ? (
                        <div className={styles.invalidUrl}>Invalid Video URL</div>
                    ) : isPlaying ? (
                        <iframe
                            src={embedUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.iframe}
                        ></iframe>
                    ) : (
                        <div
                            className={styles.thumbnailWrapper}
                            onClick={() => setIsPlaying(true)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Play video: ${video.title}`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setIsPlaying(true);
                                }
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={thumbnailUrl}
                                alt={video.title}
                                className={styles.thumbnailImage}
                                loading="lazy"
                            />
                            <div className={styles.playButton}>
                                <div className={styles.playIcon}></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{video.title}</h3>
                    <div className={styles.meta}>
                        <span className={styles.date}>{video.date}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
