import prettierConfig from "eslint-config-prettier";

export default [
	prettierConfig,
	{
		ignores: [
			"dist",
			"vite.config.js",
			"eslint.config.js",
			"eslint-config",
			".vscode",
			"prettier-config",
			"nodemon.json",
		],
	},
];
