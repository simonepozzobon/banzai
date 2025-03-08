import eslint from "@eslint/js";
import vuePlugin from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import";
import base from "./eslint.config.js";

export default [
	...vuePlugin.configs["flat/recommended"],
	eslint.configs.recommended,
	...base,
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
	},
];

export const ignores = ["vite.config.js"];
