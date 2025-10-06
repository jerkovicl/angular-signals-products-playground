// @ts-check

/**
 * @fileoverview ESLint configuration file.
 * @author Luka Jerkovic
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { defineConfig } from "eslint/config";
// @ts-ignore
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";

//-----------------------------------------------------------------------------
// Configuration
//-----------------------------------------------------------------------------

export default defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    // @ts-ignore
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
]);
