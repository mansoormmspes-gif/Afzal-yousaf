import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "About Afzal yousaf | Writer",
    description: "Learn more about Afzal yousaf, a writer and storyteller.",
};

export default async function About() {
    const settings = await getSettings();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>About Me</h1>
                <p className={styles.intro}>
                    {settings.aboutIntro}
                </p>
            </header>

            <div className={styles.content}>
                {settings.aboutPhoto && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={settings.aboutPhoto}
                            alt="Afzal yousaf"
                            width={800}
                            height={500}
                            className={styles.image}
                            priority
                        />
                    </div>
                )}

                <div className={styles.bio}>
                    {settings.aboutBio1 && <p>{settings.aboutBio1}</p>}
                    {settings.aboutBio2 && <p>{settings.aboutBio2}</p>}
                    {settings.aboutBio3 && <p>{settings.aboutBio3}</p>}
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
