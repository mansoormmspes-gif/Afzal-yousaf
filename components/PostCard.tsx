"use client";

import Link from "next/link";
import styles from "./PostCard.module.css";
import { Post } from "@/lib/posts";
import { motion } from "framer-motion";

export default function PostCard({ post }: { post: Post }) {
    const defaultImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800";
    const imageUrl = post.coverImage || defaultImage;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -8 }}
            className={styles.cardWrapper}
        >
            <Link href={`/blog/${post.slug}`} className={styles.card}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                >
                    <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.content}>
                    <div className={styles.meta}>
                        <span className={styles.category}>{post.category}</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.date}>{post.date}</span>
                    </div>
                    <h3 className={styles.title}>{post.title}</h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    <div className={styles.footer}>
                        <span className={styles.readMore}>Read article</span>
                        <span className={styles.readTime}>
                            {Math.ceil(post.content.split(" ").length / 200)} min read
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
