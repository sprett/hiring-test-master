#!/bin/bash
set -eEuo pipefail

# This script requires the following things to be installed:
#  - bash
#  - curl

# Required inputs:
MATTERMOST_BOT_KEY=$1
MSG=$2

# Optional inputs:
CHANNEL=${3:-'#releases'}
USERNAME=${4:-'Gitlab CI/CD'}
ICON_URL=${5:-'https://oliasoftstaticwebsite.blob.core.windows.net/helpguideimages/robot-icon.png'}
MATTERMOST_URL=${6:-'https://mm.oliasoft.com/hooks/'}

curl -X POST \
  --data-urlencode \
  "payload={\"channel\": \"$CHANNEL\", \"username\": \"$USERNAME\", \"icon_url\": \"$ICON_URL\", \"text\": \"$MSG\"}" \
  $MATTERMOST_URL$MATTERMOST_BOT_KEY
