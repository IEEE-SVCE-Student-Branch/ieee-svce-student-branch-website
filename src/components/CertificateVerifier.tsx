"use client";

import React, { useState } from "react";
import { VERIFIED_CERTIFICATES_CATALOG, VerifiedCertificate } from "@/lib/data/branch-data";

export function CertificateVerifier({ initialCode = "" }: { initialCode?: string }) {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [result, setResult] = useState<VerifiedCertificate | null>(() => {
    if (!initialCode) return null;
    return (
      VERIFIED_CERTIFICATES_CATALOG.find(
        (c) => c.certificateId.toLowerCase() === initialCode.toLowerCase()
      ) || null
    );
  });
  const [hasSearched, setHasSearched] = useState(Boolean(initialCode));

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toLowerCase();
    setHasSearched(true);
    const found = VERIFIED_CERTIFICATES_CATALOG.find(
      (c) => c.certificateId.toLowerCase() === query
    );
    setResult(found || null);
  };

  const loadSample = (code: string) => {
    setSearchCode(code);
    setHasSearched(true);
    const found = VERIFIED_CERTIFICATES_CATALOG.find((c) => c.certificateId === code);
    setResult(found || null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Verification Input Box */}
      <form
        onSubmit={handleVerify}
        style={{
          backgroundColor: "var(--color-surface)",
          backdropFilter: "blur(14px)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sm)",
          padding: "2.25rem",
          boxShadow: "var(--shadow-card)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <span
          className="mono"
          style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-primary)" }}
        >
          {"// PUBLIC CREDENTIAL VERIFICATION ENGINE"}
        </span>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 800 }}>
          Enter Certificate ID / Verification Code
        </h2>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="e.g. IEEE-SVCE-2026-IMP-042"
            style={{
              flex: "1 1 300px",
              padding: "0.875rem 1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9375rem",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xs)",
              backgroundColor: "#ffffff",
              color: "var(--color-text-primary)",
            }}
            aria-label="Certificate ID"
          />
          <button
            type="submit"
            style={{
              padding: "0.875rem 2rem",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              borderRadius: "var(--radius-xs)",
              cursor: "pointer",
            }}
            data-cursor="VERIFY"
          >
            VERIFY CREDENTIAL
          </button>
        </div>

        {/* Sample Codes */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
          <span
            className="mono"
            style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
          >
            Try Sample IDs:
          </span>
          {VERIFIED_CERTIFICATES_CATALOG.map((c) => (
            <button
              key={c.certificateId}
              type="button"
              onClick={() => loadSample(c.certificateId)}
              className="mono"
              style={{
                fontSize: "0.625rem",
                color: "var(--color-primary)",
                background: "var(--color-primary-subtle)",
                padding: "0.2rem 0.5rem",
                borderRadius: "var(--radius-xs)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {c.certificateId}
            </button>
          ))}
        </div>
      </form>

      {/* Result Display */}
      {hasSearched && (
        <div>
          {result ? (
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                backdropFilter: "blur(14px)",
                border: "2px solid var(--color-accent-emerald)",
                borderRadius: "var(--radius-sm)",
                padding: "2.5rem",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.25rem", color: "var(--color-accent-emerald)" }}>
                    ✓
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 800,
                      color: "var(--color-accent-emerald)",
                    }}
                  >
                    AUTHENTICATED INSTITUTIONAL CREDENTIAL
                  </span>
                </div>
                <span
                  className="mono"
                  style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}
                >
                  ID: {result.certificateId}
                </span>
              </div>

              <div
                style={{
                  padding: "1.75rem",
                  backgroundColor: "rgba(16, 185, 129, 0.04)",
                  borderRadius: "var(--radius-xs)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: "0.75rem", color: "var(--color-primary)", fontWeight: 700 }}
                >
                  [ {result.role} CREDENTIAL ]
                </div>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 900 }}>{result.recipientName}</h3>
                {result.awardTitle && (
                  <div
                    style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-primary)" }}
                  >
                    {result.awardTitle}
                  </div>
                )}
                <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}>
                  Conferred for active participation and distinction in{" "}
                  <strong>{result.eventTitle}</strong> held on {result.eventDate}.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                <div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: "0.625rem" }}>
                    SIGNATORY
                  </div>
                  <div style={{ fontWeight: 700, marginTop: "0.15rem" }}>{result.signatory}</div>
                </div>
                <div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: "0.625rem" }}>
                    ISSUING INSTITUTION
                  </div>
                  <div style={{ fontWeight: 700, marginTop: "0.15rem" }}>{result.institution}</div>
                </div>
                <div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: "0.625rem" }}>
                    VERIFICATION CHECKSUM
                  </div>
                  <div style={{ fontWeight: 700, marginTop: "0.15rem" }}>
                    {result.verificationHash}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "2rem",
                backgroundColor: "rgba(239, 68, 68, 0.05)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div
                className="mono"
                style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#ef4444" }}
              >
                RECORD NOT FOUND // CONTENT PENDING VERIFICATION
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                The certificate identifier <code>&quot;{searchCode}&quot;</code> is not present in
                the current published index. If you believe this is an error, please contact the
                branch desk.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
