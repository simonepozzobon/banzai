import globals from "globals";
import eslint from "@eslint/js";
import vuePlugin from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import";
import base from "./eslint.config.js";

export default [
	eslint.configs.recommended,
	...vuePlugin.configs["flat/recommended"],
	...base,
	{ languageOptions: { globals: globals.browser } },
	{
		files: ["**/*.vue", "**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
		},
		plugins: {
			import: importPlugin,
			vue: vuePlugin,
		},
		rules: {
			"vue/multi-word-component-names": "off",
			"vue/html-self-closing": [
				"error",
				{
					html: {
						void: "always",
						normal: "never",
						component: "always",
					},
				},
			],
			"no-console": "warn",
			"no-debugger": "error",
		},
		ignores: ["node_modules/**", "dist", "vite.config.js"],
	},
];
