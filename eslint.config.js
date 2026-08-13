import {
  globalConfig,
  jsConfig,
  tsConfig,
  vueConfig,
} from '@cherepanov.pavel/shareable-config/tools/eslint-config/index.js';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

const eslintConfig = [
  ...globalConfig,
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
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': ['error', {
        ignores: [
          'Index',
          '[page]',
          '[...slug]',
        ],
      }],
    },
  });
  eslintConfig.push({
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    rules: {
      '@stylistic/no-tabs': ['off'],
      '@typescript-eslint/prefer-enum-initializers': ['off'],
    },
  });
  eslintConfig.push(...pluginVueA11y.configs['flat/recommended']);
  // TODO: add errors about empty style/script tags?
}
override();

export default eslintConfig;

// add later
// {
// 		plugins: {
// 			json,
// 		},
// 	},
// 	{
// 		files: ["**/*.json"],
// 		ignores: ["package-lock.json"],
// 		language: "json/json",
// 		rules: jsonRules
// 	},
// 	{
// 		files: ["**/*.jsonc", ".vscode/*.json"],
// 		language: "json/jsonc",
// 		rules: jsonRules
// 	},
// 	{
// 		files: ["**/*.json5"],
// 		language: "json/json5",
// 		rules: jsonRules
// 	},
