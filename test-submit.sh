#!/bin/bash
# Quick test for the talent network relay — skips the entire onboarding flow.
# Usage: ./test-submit.sh [--real]
#   Default: submits a fake test candidate (safe to delete)
#   --real:  submits from your actual cv.md + config/profile.yml

set -e

RELAY_URL="https://speedrun-submit.jmazer.workers.dev/submit"
RELAY_KEY="kPx6kzcYoRGOG02Ec26Y5bA2KS7kcGANlqxSV1aQ"

if [ "$1" = "--real" ]; then
  echo "Submitting from your real profile..."
  node submit-to-network.mjs
else
  echo "Submitting test candidate (delete from Gem after)..."
  curl -s -X POST "$RELAY_URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $RELAY_KEY" \
    -d '{
      "name": "Test Relay Candidate",
      "email": "test-relay-delete-me@example.com",
      "linkedin": "https://linkedin.com/in/test-relay-delete-me",
      "company": "Test Corp",
      "title": "Test Engineer",
      "location": "San Francisco",
      "craft": "Engineering",
      "continent": "North America",
      "accomplishments": "TEST SUBMISSION — delete from Gem.",
      "building": "Testing the relay",
      "polarity": "Test only",
      "links": "https://github.com/test",
      "utm_source": "speedrun-career-ops",
      "utm_medium": "test-script"
    }' | python3 -m json.tool
fi
