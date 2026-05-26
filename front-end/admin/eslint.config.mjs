import nextOnPagesPlugin from "eslint-plugin-next-on-pages";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const cleanNextOnPagesPlugin = {
  rules: nextOnPagesPlugin.rules,
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: { "next-on-pages": cleanNextOnPagesPlugin },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "next-on-pages/no-nodejs-runtime": "error",
      "next-on-pages/no-unsupported-configs": "error",
      "next-on-pages/no-app-nodejs-dynamic-ssg": "error",
      "next-on-pages/no-pages-nodejs-dynamic-ssg": "error",
    },
  },
];

export default eslintConfig;
