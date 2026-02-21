"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../contact/page.module.css"; // Reusing contact form styles

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
            } else {
                setError("Invalid password");
            }
        } catch (err) {
            setError("An error occurred");
        }
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 6rem)", // Subtract the header height
            padding: "1rem"
        }}>
            <div className={styles.container} style={{ maxWidth: "400px", width: "100%", margin: 0 }}>
                <header className={styles.header}>
                    <h1 className={styles.title} style={{ fontSize: "2rem" }}>Admin Login</h1>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.group}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
