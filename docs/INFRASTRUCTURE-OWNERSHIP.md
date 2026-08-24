# Infrastructure Ownership

## Mission
Ensure the IEEE SVCE Digital Institution platform survives student committee turnover and remains under institutional control. **Personal student accounts must never be the sole owner of production infrastructure.**

## 1. Domain Registration
- **Owner**: Institutional account (e.g., faculty advisor email, or a dedicated `admin@ieee-svce.edu` alias controlled by the college IT/Branch Counselor).
- **Policy**: The domain must NEVER be registered under a graduating student's personal email or credit card.
- **Recovery**: Branch Counselor holds the primary recovery email.

## 2. Source Code & Git Repository
- **Owner**: GitHub Organization (e.g., `github.com/ieee-svce`).
- **Policy**: The repository must reside in the organization. Students are granted Admin access during their tenure, then demoted to read-only or removed upon graduation.
- **Recovery**: Branch Counselor must be an Owner of the GitHub Organization.

## 3. Hosting & Deployment (PaaS/CDN)
- **Owner**: Organization account linked to the institutional email.
- **Policy**: Vercel/Cloudflare/etc. teams must be used. Personal hobby tiers tied to personal GitHub accounts are prohibited for production.
- **Recovery**: Branch Counselor maintains Owner access to the hosting team.

## 4. Database & Storage Services
- **Owner**: Institutional email.
- **Policy**: Services like Neon, Supabase, or AWS must be provisioned under the institutional email.
- **Recovery**: Root account credentials securely stored and accessible by the Branch Counselor.

## 5. Third-Party Integrations
- All API keys (e.g., Resend, Sentry) must be generated from accounts registered to the institutional email.

## 6. Dead-Man's-Switch
- An automated "proof of life" email is sent annually to the active committee chair and the Branch Counselor. If unacknowledged for 30 days, emergency access protocols are surfaced to the Branch Counselor.
