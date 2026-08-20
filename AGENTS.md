\# IEEE SVCE Digital Institution — Agent Constitution



\## Mission



This repository implements the IEEE SVCE Digital Institution.



It is not merely a website.



It is a permanent institutional platform containing:



\- public digital experience

\- private committee operations

\- institutional archive

\- event system

\- project system

\- people system

\- resource system

\- knowledge graph

\- creative experience engine

\- evidence/provenance system

\- committee handover system



\## Non-negotiable rules



1\. Never invent IEEE SVCE facts.

2\. Never invent people, events, awards, statistics, partnerships or projects.

3\. Never expose private information publicly.

4\. Never rely on frontend hiding for authorization.

5\. Never delete historical institutional records without explicit policy.

6\. Never hardcode event information into presentation components.

7\. Never create one-off event templates when the Creative Experience Engine should be used.

8\. Every important public entity must have a stable URL.

9\. Every important institutional mutation must be auditable.

10\. Public content must remain statically renderable wherever practical.

11\. Accessibility is a release requirement.

12\. Mobile responsiveness is a release requirement.

13\. Do not introduce unnecessary microservices.

14\. Do not introduce dependencies without justification.

15\. Do not modify architecture silently.

16\. Significant architecture decisions must be recorded in docs/adr/.

17\. AI-generated content is never automatically considered institutional truth.

18\. External integrations must be failure tolerant and idempotent.

19\. Historical content must remain reproducible.

20\. Future IEEE SVCE committees must be able to maintain the system without the original developers.



\## Public/private boundary



The public website and private operating system are separate trust domains.



Private data must never be sent to an unauthorized client.



\## Creative Engine



The Creative Experience Engine may compose approved components and layouts.



It must not generate arbitrary production HTML/CSS that bypasses the design system.



\## Verification



Before declaring a task complete:



\- run relevant tests

\- run type checking

\- run linting

\- run builds

\- inspect the actual browser result for UI work

\- report failures honestly



\## Agent behavior



Before making large changes:



1\. inspect the repository

2\. inspect the architecture

3\. explain the intended change

4\. implement the smallest coherent unit

5\. verify it

6\. report what changed



Never claim success without verification.

