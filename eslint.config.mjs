import { defineConfig, globalIgnores } from "eslint/config";
import convexPlugin from "@convex-dev/eslint-plugin";

/** Root ESLint covers Convex only. App lint configs live under apps/*. */
const eslintConfig = defineConfig([
  ...convexPlugin.configs.recommended,
  globalIgnores([
    ".next/**",
    "apps/**",
    "packages/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "convex/_generated/**",
  ]),
]);

export default eslintConfig;
