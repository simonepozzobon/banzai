import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
	prettierConfig,
	{
		name: "base-config",
		files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.jsx"],
		ignores: [
			"node_modules/**",
			"dist/**",
			"vite.config.js",
			"eslint.config.js",
			"eslint-config/**",
			".vscode/**",
			"prettier-config/**",
			"nodemon.json",
		],
		rules: {},
	},
];
