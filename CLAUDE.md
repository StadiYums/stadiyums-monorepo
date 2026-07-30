@AGENTS.md

# Claude session notes — StadiYums

## Linear (non-negotiable)

All work in this repo must be attached to a **StadiYums** Linear issue (`HEX-*` on Hexacomb).

Before coding:

1. Identify or create the Linear issue in project **StadiYums**.
2. Read the issue (acceptance criteria, blockers, supersession notes).
3. Create/check out the Linear-suggested branch (`gitBranchName`) — one branch per issue for GitHub integration.
4. Move the issue to **In Progress**.

During work:

- Keep commits on that branch only; do not pile unrelated tickets onto it.
- Put `(HEX-NNN)` or the id in commit messages.
- Prefer the Hexacomb Linear MCP for issue updates; do not use the Babbage Linear workspace for StadiYums.

After implementation (required):

1. Run **atomic Karma commits** — smallest sensible Conventional Commits (`type(scope): summary`), one logical change each; include `HEX-NNN`.
2. **Push** the ticket branch to `origin` so Linear’s GitHub integration tracks it (`git push -u origin HEAD` on first push).
3. Do not leave finished work sitting uncommitted or unpushed.
4. Open/update the PR with title `HEX-NNN: …` and body magic word `Fixes HEX-NNN` — GitHub’s auto title from the branch often breaks Linear linking (`hex-142` → `hex 142`).
5. When the PR is created (opened): move the issue to **In Review**.

Ship:

- Open a PR from the ticket branch; title includes `HEX-NNN`.
- Move the issue to **In Review** when that PR is opened.
- Mark Done only after merge and acceptance criteria are satisfied.

## Monorepo direction

Milestone **A0: Monorepo & Three-App Architecture** — start from HEX-142 (workspace), then app scaffolds / shared packages / migrations. Do not reintroduce canceled `/fan` or `/runner` routes in legacy `src/`.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
