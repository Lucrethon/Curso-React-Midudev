import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "off", // Apagamos la de JS puro
      "@typescript-eslint/no-unused-vars": "error", // Encendemos la de TypeScript como ERROR (rojo)
      "react/react-in-jsx-scope": "off", // Desactivar regla vieja de React
    },
  }
);