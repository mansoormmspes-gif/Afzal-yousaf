"use client";

import styles from "./VideoCard.module.css";
import { Video } from "@/lib/videos";
import { motion } from "framer-motion";

export default function VideoCard({ video }: { video: Video }) {
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(video.youtubeUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -8 }}
            className={styles.cardWrapper}
        >
            <div className={styles.card}>
                <div className={styles.videoContainer}>
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.iframe}
                        ></iframe>
                    ) : (
                        <div className={styles.invalidUrl}>Invalid Video URL</div>
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
