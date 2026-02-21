"use client";

import { motion, Variants } from "framer-motion";

const variants: Variants = {
    hidden: { opacity: 0, y: 15 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            style={{ width: "100%" }}
        >
            {children}
        </motion.main>
    );
}
