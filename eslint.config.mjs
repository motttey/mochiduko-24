import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "docs/**",
    "node_modules/**",
    "out/**",
    "public/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);
