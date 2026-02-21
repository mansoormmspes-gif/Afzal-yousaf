import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Afzal yousaf | Writer",
    description: "Learn more about Afzal yousaf, a writer and storyteller.",
};

export default function About() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>About Me</h1>
                <p className={styles.intro}>
                    Minimalist. Writer. Observer of the digital age.
                </p>
            </header>

            <div className={styles.content}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                        alt="Afzal yousaf"
                        width={800}
                        height={500}
                        className={styles.image}
                        priority
                    />
                </div>

                <div className={styles.bio}>
                    <p>
                        Hello! I'm Afzal yousaf. Based in a quiet corner of the world, I spend
                        my days exploring the nuances of modern life, technology, and design.
                        My writing focuses on finding clarity in a complex world and helping
                        others do the same.
                    </p>
                    <p>
                        With a background in literature and a passion for digital aesthetics,
                        I believe that good design and good writing share the same
                        principles: simplicity, structure, and purpose.
                    </p>
                    <p>
                        This blog is my digital garden—a collection of thoughts, essays, and
                        experiments. I hope you find something here that resonates with you.
                    </p>
                </div>

                <div className={styles.cta}>
                    <Link href="/contact" className={styles.button}>
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    );
}
