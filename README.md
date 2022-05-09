# JValue TypeScript Error Handling

A simple library for error handling, used in the JValue projects.

## Install

* Download dependencies: `npm install`

## Linting

* Linting: `npm run lint`

## Testing

* One test run: `npm test`
* Start tests in watch mode: `npm run test:watch`

## VSCode Setup

We propose to use the following VSCode plugin so benefit from our preset configs out of the box:

* ESLint: `dbaeumer.vscode-eslint`
* Prettier: `esbenp.prettier-vscode`
* Editorconfig: `editorconfig.editorconfig`

### Config ESlint

Recommended config (paste into `/.vscode/settings.json`):

```javascript
{
	"eslint.validate": ["typescript"],
	"typescript.preferences.importModuleSpecifier": "relative",
	"[javascript]": {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[json]": {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[jsonc]": {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
		"editor.formatOnSave": false,
		"editor.defaultFormatter": "esbenp.prettier-vscode",
		"editor.codeActionsOnSave": ["source.fixAll.format", "source.fixAll.eslint"]
	}
}
```


## License

Copyright 2022 Friedrich-Alexander University Erlangen-Nürnberg (FAU).
This work (source code) is licensed under [Apache-2.0](./LICENSE).
