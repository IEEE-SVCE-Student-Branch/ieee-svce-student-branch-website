# Security and RBAC Model

## Authorization Principles
- Frontend hiding is NOT an acceptable authorization method; all checks must occur server-side.
- Private data must never be sent to an unauthorized client.

## Role-Based Access Control (RBAC)
- **Guest (Unauthenticated)**: Read-only access to public endpoints.
- **Member**: Access to member-only resources, ability to RSVP.
- **Committee Member**: Write access to specific operational domains.
- **Admin**: Full access, including committee handover actions.

## Auditing
- Every important institutional mutation must be auditable (Audit Logs).

## DECISION REQUIRED
- Will we integrate with IEEE Account (SSO) for authentication, or maintain a local directory?
