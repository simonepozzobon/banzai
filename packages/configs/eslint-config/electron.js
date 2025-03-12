import globals from "globals";
import eslint from "@eslint/js";
import base from "./eslint.config.js";

export default [
	eslint.configs.recommended,
	...base,
	{
		files: ["**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node,
				electron: "readonly",
				app: "readonly",
				BrowserWindow: "readonly",
				ipcMain: "readonly",
				ipcRenderer: "readonly",
				webFrame: "readonly",
				process: "readonly",
				require: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
				module: "readonly",
			},
		},
		rules: {
			eqeqeq: "error",
			curly: "error",
			"dot-notation": "warn",
			"array-callback-return": "error",
			"no-empty": ["error", { allowEmptyCatch: true }],
			"no-unused-vars": "error",
			"no-shadow": "off",

			"no-console": "warn",
			"eol-last": "error",
			semi: "error",
			"prefer-const": "error",
			"no-multiple-empty-lines": "warn",
			"template-curly-spacing": "off",

			"no-empty-pattern": "warn",
			"no-unsafe-optional-chaining": "off",
			"no-import-assign": "off",
		},
		ignores: ["node_modules/**", "dist/**", "nodemon.json"],
	},
];
