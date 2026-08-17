import {
  globalConfig,
  jsConfig,
  tsConfig,
  vueConfig,
} from '@cherepanov.pavel/shareable-config/tools/eslint-config/index.js';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';

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
  eslintConfig.push(
    (
      eslintPluginTailwindcss.configs['flat/recommended']
      || eslintPluginTailwindcss.configs.recommended
    ),
  );
  eslintConfig.push({
    settings: {
      // Define the tailwindcss settings with the MANDATORY `cssConfigPath`
      tailwindcss: {
        cssConfigPath: './app/assets/css/tailwind.css',
      },
    },
    // Optional: Customize the rules to your needs
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-negative-arbitrary-values': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/important-modifier-suffix': 'error',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
    },
  });
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
