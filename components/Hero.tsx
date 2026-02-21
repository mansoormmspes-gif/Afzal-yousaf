"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 15,
        }
    }
};

export default function Hero() {
    return (
        <section className={styles.hero}>
            <motion.div
                className={styles.content}
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={itemVariants} className={styles.introWrapper}>
                    <span className={styles.intro}>Writer & Storyteller</span>
                    <div className={styles.line}></div>
                </motion.div>

                <motion.h1 variants={itemVariants} className={styles.title}>
                    Afzal yousaf
                </motion.h1>

                <motion.p variants={itemVariants} className={styles.description}>
                    Exploring the intersection of minimalism, technology, and design.
                    Sharing thoughts on writing, creativity, and navigating the digital age.
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Link href="/blog" className={styles.cta}>
                        Read the Blog
                    </Link>
                </motion.div>
            </motion.div>

            {/* Background glowing effect */}
            <div className={styles.glowBlob}></div>
        </section>
    );
}
