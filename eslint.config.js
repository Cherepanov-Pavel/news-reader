import {
	globalConfig,
	jsonConfig,
	jsConfig,
	tsConfig,
	vueConfig,
} from "@cherepanov.pavel/shareable-config/eslint-config";
import {
	OFF,
	WARN,
	ERROR,
} from "@cherepanov.pavel/shareable-config/eslint-config/constants/severity.js";
import {
	getDisabledWarningRules,
} from "@cherepanov.pavel/shareable-config/utils";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";

const eslintConfig = [
	...globalConfig,
	...jsonConfig,
	jsConfig,
	tsConfig,
	vueConfig,
];

export function override() {
	// you can override some part of config here, by eslintConfig.push()
	// for the example, uncomment this line:
	// eslintConfig.push({
	//   files: ['**/*.js'],
	//   rules: {
	//     'no-dupe-keys': 'off',
	//   },
	// });
	eslintConfig.push({
		files: [
			"**/*.vue",
		],
		rules: {
			"vue/multi-word-component-names": [
				ERROR,
				{
					ignores: [
						"Index",
						"[page]",
						"[...slug]",
					],
				},
			],
		},
	});
	eslintConfig.push(...pluginVueA11y.configs["flat/recommended"]);
	// TODO: add errors about empty script tags?
	eslintConfig.push(eslintPluginTailwindcss.configs.recommended);
	eslintConfig.push({
		files: eslintPluginTailwindcss.configs.recommended.files,
		settings: {
			tailwindcss: {
				cssConfigPath: "./app/assets/css/tailwind.css",
			},
		},
		rules: {
			"tailwindcss/classnames-order": ERROR,
			"tailwindcss/enforces-negative-arbitrary-values": ERROR,
			"tailwindcss/enforces-shorthand": ERROR,
			"tailwindcss/important-modifier-suffix": ERROR,
			"tailwindcss/no-arbitrary-value": OFF,
			"tailwindcss/no-contradicting-classname": ERROR,
			"tailwindcss/no-custom-classname": WARN,
			"tailwindcss/no-unnecessary-arbitrary-value": ERROR,
		},
	});
	eslintConfig.push({
		files: [
			"test/**/*.{js,ts,vue}",
		],
		rules: getDisabledWarningRules(eslintConfig),
	});
}
override();

export default eslintConfig;
