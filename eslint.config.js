import {
	globalConfig,
	jsonConfig,
	jsConfig,
	tsConfig,
	vueConfig,
} from "@cherepanov.pavel/shareable-config/tools/eslint-config/index.js";
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
				"error",
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
	eslintConfig.push({
		files: [
			"**/*.vue",
			"**/*.ts",
			"**/*.js",
		],
		rules: {
			"@typescript-eslint/prefer-enum-initializers": [
				"off",
			],
			"@typescript-eslint/naming-convention": [
				"off",
			],
			"@stylistic/indent": [
				"error",
				"tab",
				{
					tabLength: 2,
					MemberExpression: 0,
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
			"tailwindcss/classnames-order": "error",
			"tailwindcss/enforces-negative-arbitrary-values": "error",
			"tailwindcss/enforces-shorthand": "error",
			"tailwindcss/important-modifier-suffix": "error",
			"tailwindcss/no-arbitrary-value": "off",
			"tailwindcss/no-contradicting-classname": "error",
			"tailwindcss/no-custom-classname": "warn",
			"tailwindcss/no-unnecessary-arbitrary-value": "error",
		},
	});
}
override();

export default eslintConfig;
