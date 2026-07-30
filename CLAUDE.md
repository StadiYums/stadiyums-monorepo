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

Ship:

- Open a PR from the ticket branch; title includes `HEX-NNN`.
- Mark Done only after merge and acceptance criteria are satisfied.

## Monorepo direction

Milestone **A0: Monorepo & Three-App Architecture** — start from HEX-142 (workspace), then app scaffolds / shared packages / migrations. Do not reintroduce canceled `/fan` or `/runner` routes in legacy `src/`.
