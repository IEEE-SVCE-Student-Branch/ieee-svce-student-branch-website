import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { CertificateVerifier } from "@/components/CertificateVerifier";

export const metadata: Metadata = {
  title: "Public Certificate Verification",
  description:
    "Verify the authenticity of credentials, workshop completion certificates, and symposium awards issued by IEEE SVCE (STB 28051).",
};

interface CertificatesPageProps {
  searchParams: Promise<{ id?: string; code?: string }>;
}

export default async function CertificatesPage({ searchParams }: CertificatesPageProps) {
  const { id, code } = await searchParams;
  const initial = id || code || "";

  return (
    <PageShell
      title="Public Certificate Verification (Credential Vault)"
      categoryTag="// CRYPTOGRAPHIC AUTHENTICITY"
      description="Instant public verification of certificates issued for IEEE SVCE technical symposia, robotics arenas, paper tracks, and laboratory workshops."
      breadcrumbLabel="CERTIFICATES"
      provenanceCode="STB28051-CERT-VAULT"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Interactive Verifier */}
        <CertificateVerifier initialCode={initial} />

        {/* Institutional Verification Architecture Notice */}
        <div
          style={{
            padding: "1.75rem",
            backgroundColor: "var(--color-surface-muted)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-primary)" }}>
            INSTITUTIONAL CREDENTIAL POLICY
          </span>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            All legitimate IEEE SVCE certificates are recorded in the institutional database with cryptographic verification checksums and counter-signed by the Student Branch Counselor. Backend automated ledger synchronization is active under Phase 4 architecture.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
