import base from "./eslint.config";
import electronPlugin from "eslint-plugin-electron";

export default [
	...base,
	...electronPlugin.configs.recommended,
	{
		languageOptions: {
			globals: {
				// This replaces the env settings for electron
				...electronPlugin.environments.main.globals,
				...electronPlugin.environments.renderer.globals,
				...electronPlugin.environments.preload.globals,
			},
		},
		plugins: {
			electron: electronPlugin,
		},
		rules: {
			"electron/no-ipc-sync": "error",
			"electron/no-remote-require": "error",
			"electron/prefer-send-sync": "error",
		},
	},
];
