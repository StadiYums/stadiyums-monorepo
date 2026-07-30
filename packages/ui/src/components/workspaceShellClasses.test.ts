import assert from "node:assert/strict";
import test from "node:test";
import { workspaceContentClassNames } from "./workspaceShellClasses.ts";

test("keeps fluid workspaces free of a global readable cap", () => {
  assert.equal(
    workspaceContentClassNames("fluid", "dashboard"),
    "w-full workspace-variant-dashboard",
  );
});

test("provides separate readable and large inner caps", () => {
  assert.match(workspaceContentClassNames("readable", "form"), /max-w-3xl/);
  assert.match(workspaceContentClassNames("large", "map"), /max-w-\[1920px\]/);
});

test("exposes every documented workspace composition", () => {
  for (const variant of ["dashboard", "table", "map", "form", "kiosk"] as const) {
    assert.match(workspaceContentClassNames("fluid", variant), new RegExp(`workspace-variant-${variant}`));
  }
});
