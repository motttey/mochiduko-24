import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint';
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
    ...nextVitals,
    js.configs.recommended,
    ...tseslint.configs.recommended,
    globalIgnores([
        'node_modules/**',
        '.next/**',
        'public/**',
        'out/**',
        'next-env.d.ts',
        'tailwind.config.js',
        'postcss.config.cjs',
        '.lintstagedrc.js'
    ]),
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        },
    },
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/no-unknown-property': 'off',
            '@typescript-eslint/no-explicit-any': 'warn'
        }
    },
]);
