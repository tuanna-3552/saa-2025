import { nextOnPagesPlugin } from "eslint-plugin-next-on-pages";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: { "next-on-pages": nextOnPagesPlugin },
    rules: {
      ...nextOnPagesPlugin.configs.recommended.rules,
    },
  },
];

export default eslintConfig;
