<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent operating rules — StadiYums

## Linear work items (required)

Every change in this repo must map to a work item in the **StadiYums** project on the Hexacomb Linear workspace (`HEX-*`).

Do **not** implement features, fixes, refactors, or docs-only process changes without an attached Linear issue. If none exists, create one in StadiYums (or ask the human to) before coding.

### One branch per issue

Linear ↔ GitHub auto-links branches. Always use the issue’s suggested git branch name from Linear (`gitBranchName`), for example:

```text
marco/hex-142-convert-repo-to-pnpmturbo-monorepo-with-apps-workspace
```

Rules:

1. Create and check out that branch **before** any implementation commits.
2. Never mix multiple `HEX-*` issues on one branch.
3. Never commit ticket work to `main`.
4. Push the branch so GitHub ↔ Linear can attach the PR/commits to the issue.
5. Open one PR per issue; reference the identifier in the PR title (e.g. `HEX-142: …`).

### Commits (atomic Karma / Conventional Commits)

After finishing implementation on a ticket branch — **before** opening or updating the PR — create **atomic Karma-style commits**, then **push the branch** to `origin`.

Include the issue id in every commit message:

```text
feat(monorepo): add pnpm/turbo workspace (HEX-142)
```

Rules:

1. Prefer the **atomic-karma-commits** skill / workflow: inspect the tree, split by one logical behavior, stage intentionally, commit with `type(scope): summary`.
2. Keep commits independently revertable. If the title needs "and", split it.
3. Separate docs, tooling/deps, CI, and product behavior unless they are inseparable.
4. Do **not** leave finished ticket work uncommitted on the local branch.
5. After the commit set is clean: `git push -u origin HEAD` (or `git push` if tracking exists) so Linear ↔ GitHub stays linked.

### Status transitions

When starting work: move the issue to **In Progress** (and assign yourself if unassigned).

When the PR is open: leave status as In Progress / In Review per team convention.

When merged and acceptance criteria are met: mark the issue **Done**.

### MCP

Use the Hexacomb Linear MCP (`plugin-linear-linear` / Hexacomb workspace) for StadiYums tickets — not the Babbage Linear workspace.

### Architecture note

Route-only fan/runner scaffolds inside legacy `src/` are canceled. New UI lives under `apps/fan`, `apps/runner`, and `apps/admin` after the monorepo split (see HEX-142 and children). Keep legacy `src/` only until migration tickets complete.
