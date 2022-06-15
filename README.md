# JValue TypeScript Error Handling

**Note:** This library is currently **NOT** in use and was replaced by [@sniptt/monads](https://github.com/sniptt-official/monads) which provides similar functionality.

A simple library for error handling, used in the JValue projects.

## Examples

### Results

Use `ResultLike` to express `Success` and `Failure` of an operation.

```javascript
const s = success(123);
const f = failure('My custom failure message');
```

This enables error handling without try/catch.

```javascript
const result = someOperationReturningAResultLike();
if (result.isSuccess()) {
	const data = result.data();
	// do sth with the data
} else {
	const errorMsgs = result.errors();
	// do sth with the error messages
}
```
All recoverable cases should be expressed explicitly as a `ResultLike`.

### Options

Use `OptionLike` to express `Some` and `None` of a type.

```javascript
const s = some(123);
const n = none();
```

This enables using syntactic sugar for default values.

```javascript
const option = someOperationReturningAnOptionLike();
const result = option.orElse('Default value');
```

### Mapping/Filtering

`ResultLike` and `OptionLike` both support the methods `map`, `flatMap`, and `filter`.

TODO


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
