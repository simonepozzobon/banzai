import eslint from "@eslint/js";
import vuePlugin from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import";
import base from "./eslint.config";

export default [
	...base,
	eslint.configs.recommended,
	{
		files: ["**/*.vue", "**/*.js", "**/*.ts"],
		languageOptions: {
			globals: {
				...eslint.configs.browser.languageOptions.globals,
				...eslint.configs.node.languageOptions.globals,
			},
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: "module",
			},
		},
		plugins: {
			import: importPlugin,
			vue: vuePlugin,
		},
		rules: {
			// Include Vue 3 recommended rules - use the correct way to access them
			...(vuePlugin.configs["vue3-recommended"]?.rules || {}),
			"no-console": "warn",
			"no-debugger": "warn",
			"vue/multi-word-component-names": "off",
			"vue/require-default-prop": "off",
		},
	},
];
