# Public/Private Boundary

## Architecture
- Strict separation between public-facing static site and private operations application.
- Public site is built from sanitized, approved data.
- Private OS sits behind authentication and requires authorized network or identity verification.

## Data Rules
- Private data must never be sent to an unauthorized client.
- The public website and private operating system are separate trust domains.

## DECISION REQUIRED
- Will the Private OS be hosted on a separate subdomain (e.g., os.ieeesvce.com) to strictly separate cookies and CORS policies?
