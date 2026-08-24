"use client";

/**
 * Global Error Boundary
 *
 * Catches unhandled React errors and displays a user-friendly message.
 * In production, error details are hidden. In development, they are shown.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <h1>Something went wrong</h1>
      <p style={{ color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
        An unexpected error occurred. Please try again.
      </p>
      {process.env.NODE_ENV === "development" && (
        <pre
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "0.75rem",
            maxWidth: "600px",
            overflow: "auto",
          }}
        >
          {error.message}
        </pre>
      )}
      <button
        onClick={reset}
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1.5rem",
          background: "var(--color-primary)",
          color: "var(--color-text-on-primary)",
          border: "none",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Try again
      </button>
    </div>
  );
}
