#!/bin/sh

set -e

release="release-$(date +%d%m%Y-%H%M%S)"

git tag "$release"
git push origin "$release"
