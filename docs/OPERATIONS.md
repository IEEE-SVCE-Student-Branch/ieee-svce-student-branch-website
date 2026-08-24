# Operations Runbook

## Overview
This runbook documents the day-to-day operations, emergency recovery procedures, and knowledge transfer mechanisms for the IEEE SVCE Digital Institution platform.

## 1. Routine Operations
- **Publishing Content**: Content is authored in the Private OS. Changing state to "Published" triggers an automated SSG rebuild via webhook.
- **Approving Roles**: Admins navigate to the Private OS Settings to assign roles to authenticated users.

## 2. Build Failure Resolution
- **Alert**: Build failures alert the committee via the configured notification channel.
- **Action**: Check CI/CD logs. Common causes: accessibility test failure, TypeScript type error, missing environment variable. The previous successful build remains live.

## 3. Disaster Recovery (RTO: 4 hours)
*A full, detailed step-by-step runbook must be maintained here as infrastructure details are finalized.*
1. **Identify Failure**: Verify if the issue is DNS, Hosting Platform, or Database.
2. **Database Restore**: Log into the managed database provider. Select the latest 24hr backup (or Point-in-Time for recent events). Trigger restore to a new instance.
3. **Reconfigure**: Update environment variables in the hosting platform with the new database connection string.
4. **Deploy**: Trigger a manual redeploy of the latest `main` branch.
5. **Verify**: Run smoke tests and accessibility checks on the restored instance.

## 4. Annual Backup Verification
- **Who**: Webmaster (Incoming Committee)
- **When**: During the handover process.
- **Task**: Restore the database to a local or staging environment and verify data integrity. The handover is incomplete until this succeeds.

## 5. Secrets Rotation
- Initiated during handover.
- **Phase 1**: Generate new API keys and database credentials. Add them alongside old keys where supported, or prepare for atomic swap.
- **Phase 2**: Update hosting platform environment variables. Redeploy.
- **Phase 3**: Verify system operations. Revoke old keys.
