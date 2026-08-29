<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent operating rules — StadiYums

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

### Architecture note

Route-only fan/runner scaffolds inside legacy `src/` are canceled. Product UI lives under `apps/fan`, `apps/runner`, `apps/system-admin`, and `apps/vendor`. Local jump links live in `apps/landing` (`:3003`); vendor uses `:3004` in local development to avoid that reserved port.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
