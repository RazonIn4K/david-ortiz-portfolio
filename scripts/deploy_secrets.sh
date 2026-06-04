#!/bin/bash
set -euo pipefail

PROJECT_ID="dizera-n8n-prod-1758"
SERVICE_ACCOUNT="n8n-cloudrun-sa@${PROJECT_ID}.iam.gserviceaccount.com"

echo "Generating random secrets..."
DB_ROOT_PASSWORD=$(openssl rand -hex 16)
DB_PASSWORD=$(openssl rand -hex 16)
N8N_ENCRYPTION_KEY=$(openssl rand -hex 16)
N8N_FORWARD_SECRET=$(openssl rand -hex 24)

create_and_populate_secret() {
  local name=$1
  local value=$2

  echo "Creating secret: $name..."
  gcloud secrets create "$name" \
    --replication-policy="automatic" \
    --project="$PROJECT_ID" || echo "Secret $name already exists, continuing..."

  echo -n "$value" | gcloud secrets versions add "$name" \
    --data-file=- \
    --project="$PROJECT_ID"

  echo "Granting Secret Accessor role to service account for secret: $name..."
  gcloud secrets add-iam-policy-binding "$name" \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor" \
    --project="$PROJECT_ID"
}

create_and_populate_secret "n8n-db-root-password" "$DB_ROOT_PASSWORD"
create_and_populate_secret "n8n-db-password" "$DB_PASSWORD"
create_and_populate_secret "n8n-encryption-key" "$N8N_ENCRYPTION_KEY"
create_and_populate_secret "n8n-forward-secret" "$N8N_FORWARD_SECRET"

echo "All secrets successfully created and permissions configured!"
