<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent operating rules — StadiYums

### Commits (atomic Karma / Conventional Commits)

After finishing implementation — create **atomic Karma-style commits**, then **push the branch** to `origin`.

```text
feat(fan): add order polling hook
```

Rules:

1. Prefer the **atomic-karma-commits** skill / workflow: inspect the tree, split by one logical behavior, stage intentionally, commit with `type(scope): summary`.
2. Keep commits independently revertable. If the title needs "and", split it.
3. Separate docs, tooling/deps, CI, and product behavior unless they are inseparable.
4. Do **not** leave finished work uncommitted on the local branch.

### Architecture note

Product UI lives under `apps/fan`, `apps/runner`, `apps/system-admin`, and `apps/vendor` with `src/` + `features/` modules. Shared backend logic lives in `packages/db` (Drizzle schema, repositories, services). Cross-app utilities live in `packages/core` and `packages/ui`. Local jump links live in `apps/landing` (`:3003`); vendor uses `:3004`.

### Backend stack

- **PostgreSQL** via `DATABASE_URL` (Neon / Supabase compatible)
- **Drizzle ORM** — `packages/db`
- **Server Actions** — thin controllers in `apps/*/src/features/*/actions/`, wrapped with `@stadiyums/core/safe-action`

### UI review: uniformity is a release criterion

An anti-pattern or accessibility scan is not a complete UI review. When creating,
editing, or reviewing product UI, inspect the change against the surrounding
surface and shared primitives before calling it finished.

Required consistency pass:

1. Compare the element with its nearest peers: spacing token, alignment, type,
   border/radius, control height, and density should match unless the content
   hierarchy requires a difference.
2. Check the page rhythm as a sequence: header → page inset → primary content →
   sections → fixed dock. Use `@stadiyums/ui` spacing roles rather than local
   padding values for shell and section relationships.
3. Verify visual order, DOM order, and keyboard order agree at mobile and desktop
   breakpoints. A responsive reflow must not make the primary action or recovery
   path harder to find.
4. Treat every intentional exception as a design decision: state why it differs,
   confirm it holds at adjacent breakpoints, and record it in the relevant design
   document if other surfaces should inherit it.
5. In the handoff, explicitly mention any remaining inconsistency or state that
   the uniformity pass found none. Do not substitute a clean anti-slop detector
   result for this comparison.

See `docs/design/review-standards.md` for the reviewer checklist and reporting
format.
