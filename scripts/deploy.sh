#!/bin/sh
# Build the site and upload dist/ to S3, then purge the Cloudflare cache.
#
#   S3_BUCKET=<bucket> npm run deploy
#
# Needs the AWS CLI with credentials for the bucket (e.g. AWS_PROFILE).
# Optional: CF_ZONE_ID + CF_API_TOKEN (Zone › Cache Purge) to purge Cloudflare afterwards.
set -eu

: "${S3_BUCKET:?Set S3_BUCKET to the target bucket name}"

npm run build

# Hashed assets never change: cache for a year.
aws s3 sync dist/_astro "s3://$S3_BUCKET/_astro" --delete \
  --cache-control "public, max-age=31536000, immutable"

# Everything else (HTML, sitemap, images in public/): always revalidate, so content edits show up straight away.
aws s3 sync dist "s3://$S3_BUCKET" --delete --exclude "_astro/*" \
  --cache-control "public, max-age=0, must-revalidate"

if [ -n "${CF_ZONE_ID:-}" ] && [ -n "${CF_API_TOKEN:-}" ]; then
  echo "Purging Cloudflare cache…"
  curl -fsS -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/purge_cache" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' > /dev/null
  echo "Purged."
else
  echo "Skipped Cloudflare purge (set CF_ZONE_ID and CF_API_TOKEN to enable)."
fi
