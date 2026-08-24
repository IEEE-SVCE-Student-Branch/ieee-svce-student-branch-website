"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent, Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/os";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          background: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem" }}>Sign In</h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
          }}
        >
          IEEE SVCE Private Operations
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              minLength={8}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: "1rem",
              }}
            />
          </div>

          {error && (
            <p
              role="alert"
              style={{
                color: "var(--color-error)",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.625rem 1rem",
              background: "var(--color-primary)",
              color: "var(--color-text-on-primary)",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "var(--transition-fast)",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
