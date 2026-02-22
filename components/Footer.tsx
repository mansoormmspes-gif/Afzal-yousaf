import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3>Afzal yousaf</h3>
                    <p>Writer, thinker, and storyteller.</p>
                </div>

                <div className={styles.socials}>
                    <a href="#" className={styles.socialLink} aria-label="Twitter">
                        <Twitter size={20} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="Instagram">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="Facebook">
                        <Facebook size={20} />
                    </a>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>&copy; 2026 Afzal yousaf. All rights reserved. Designed by <a href="https://www.instagram.com/mde.bymms/" target="_blank" rel="noopener noreferrer" className={styles.designerLink}>mde.bymms</a> with ❤️ in Kerala.</p>
            </div>
        </footer>
    );
}
