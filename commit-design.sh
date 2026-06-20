#!/usr/bin/env bash
# One-shot commit for the dark-mode + Ice Metallic Blue design pass.
# Run from your own Terminal (which has Documents access):
#   bash ~/Documents/vault/commit-design.sh
set -e
cd "$(dirname "$0")"

# Initialize the repo on first run (safe to re-run; -q stays quiet if it exists).
if [ ! -d .git ]; then
  git init -q
  echo "Initialized a new git repository."
fi

git add -A
git commit -m "Refine dark-mode palette + ice-blue accent

- Dark mode: replace pure black with #111111 / #18181b charcoal, and
  pure white body text with zinc-100 (#F4F4F5); preserve alpha scrims
- Accent: swap saturated #2e9bff for refined Ice Metallic Blue (#A7C7E7),
  hover #C2DCF0, deep #81A1C1, softened glows; recolor WhatsApp icon
- All text/accent contrast verified WCAG AA+ against the dark background"

echo "Done. Review with: git log -1 --stat"
