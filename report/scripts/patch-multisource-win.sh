#!/usr/bin/env bash
# Local workaround for finding F4: on Windows, @tabnas/multisource resolves aontu includes with
# POSIX path rules whenever an fs is injected, so `npm run generate` cannot find model/api/*.aontu.
# Patches only the project's git-ignored node_modules. Idempotent; rerun after every npm install in .sdk.
#   bash patch-multisource-win.sh [<sdk-root>]
set -euo pipefail
SDK_ROOT="${1:-$(cd "$(dirname "$0")/../.." && pwd)}"
F="$SDK_ROOT/.sdk/node_modules/@tabnas/multisource/dist/resolver/file.js"
ORIG='const P = null != ctx.meta?.fs ? Path.posix : Path;'
FIXED='const P = null != ctx.meta?.fs \&\& process.platform !== "win32" ? Path.posix : Path; // local patch, see REPORT.md F4'

if grep -qF 'process.platform !== "win32" ? Path.posix' "$F"; then
  echo "already patched: $F"
elif grep -qF "$ORIG" "$F"; then
  sed -i "s|$ORIG|$FIXED|" "$F"
  grep -qF 'process.platform !== "win32" ? Path.posix' "$F" && echo "patched: $F"
else
  echo "expected line not found; multisource changed, check F4 again: $F" >&2
  exit 1
fi
