@AGENTS.md

# Claude session notes — StadiYums

After implementation (required):

1. Run **atomic Karma commits** — smallest sensible Conventional Commits (`type(scope): summary`), one logical change each; include `HEX-NNN`.
2. **Push** the ticket branch to `origin` so GitHub tracks it (`git push -u origin HEAD` on first push).
3. Do not leave finished work sitting uncommitted or unpushed.
4. Open/update the PR with an extremely descriptive title and body written in ASD-STE100 English.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
