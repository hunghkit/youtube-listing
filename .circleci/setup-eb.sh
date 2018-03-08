#!/bin/bash
mkdir ~/.aws
touch ~/.aws/config
cat > ~/.aws/config << EOF
[profile eb-cli]
aws_access_key_id=$AWS_ACCESS_KEY_ID
aws_secret_access_key=$AWS_SECRET_ACCESS_KEY
EOF

mkdir .elasticbeanstalk
touch .elasticbeanstalk/config.yml
cat > .elasticbeanstalk/config.yml << EOF
branch-defaults:
  master:
    environment: $EB_ENV # base profile
global:
  application_name: $EB_APP
  default_region: $EB_REGION
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: eb-cli
  sc: git
  workspace_type: Application
EOF
