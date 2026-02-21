import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
            gap: "1.5rem"
        }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>Page Not Found</h2>
            <p style={{ color: "var(--muted-foreground)" }}>Could not find the requested resource.</p>
            <Link href="/" style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
                borderRadius: "var(--radius)",
                fontWeight: "500",
                textDecoration: "none"
            }}>
                Return Home
            </Link>
        </div>
    );
}
