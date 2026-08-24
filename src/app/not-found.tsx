import Link from "next/link";

/**
 * Custom 404 Page
 */
export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1>404</h1>
      <p style={{ color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>Page not found.</p>
      <Link
        href="/"
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1.5rem",
          background: "var(--color-primary)",
          color: "var(--color-text-on-primary)",
          borderRadius: "var(--radius-md)",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go home
      </Link>
    </div>
  );
}
