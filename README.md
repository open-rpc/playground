# OpenRPC Playground

This is a tool for editing, validating and previewing [OpenRPC documents](https://spec.open-rpc.org/#openrpc-document).

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=open-rpc/playground)](https://dependabot.com)

## What is it?
This is meant to be an all-in-one developer portal for [OpenRPC documents](https://spec.open-rpc.org/#openrpc-document). It includes an editor and a live-preview of the documentation.

This helps developers visualize the OpenRPC and iterate very quickly on creating [OpenRPC documents](https://spec.open-rpc.org/#openrpc-document) via the built in editor tooling.

## Usage

Navigate to [playground.open-rpc.org](https://playground.open-rpc.org/) and start playing around. You can build your own OpenRPC document, validate existing documents quickly, or use the [examples](https://github.com/open-rpc/examples).



![openrpc-playground-screenshot](https://user-images.githubusercontent.com/364566/60648033-ef5d6580-9df3-11e9-8b48-5e239f0c7574.png)

## Keybinds

- `CTRL + SPACE` - auto complete (TAB or ENTER to complete)
- `CTRL + N/CTRL + P` - down/up a line (also works as up/down in autocomplete)
- `ALT + SHIFT + F` - format document

##### Chords

- `CMD + K + BACKSPACE` - reset to empty schema
- `CMD + K + I` - pop up tooltip under cursor
- `CMD + K + V` - toggle vim mode
- `CMD + K + R` - replace meta schema

## Configuration via Query String Parameters
The query string parameters can be used to configure the playground in different ways.

###### `uiSchema`
`uiSchema` is used for UI layer configuration. here is its interface:

![image](https://user-images.githubusercontent.com/364566/63297271-d6b2ed00-c285-11e9-83ff-920e77b3c182.png)

###### `schemaUrl`
`schemaUrl` - fetch schema by URL and display it as the content of the playground on startup.

###### `schema`
`schema`  - JSON String used to  display it as the content of the playground on startup.

examples:

- set splitView to false
  - `http://playground.open-rpc.org/?uiSchema[appBar][ui:splitView]=false`
- hide appbar input bar
  - `http://playground.open-rpc.org/?uiSchema[appBar][ui:input]=false`
- provide custom name and logo
- `http://playground.open-rpc.org/?uiSchema[appBar][ui:title]=My Site&uiSchema[appBar][ui:logoUrl]=https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png`

## Resources and Inspirations

- [open-rpc/spec](https://github.com/open-rpc/spec)
- [open-rpc/docs-react](https://github.com/open-rpc/docs-react)
- [Swagger Editor](https://editor.swagger.io/)
- [Marvel Interactive Documentation](https://developer.marvel.com/docs)
- [apiary.io](https://apiary.io/)
- [Algolia interactive documentation](https://www.algolia.com/doc/onboarding/#/pick-dataset)
- [StackEdit in browser markdown editor](https://stackedit.io/app#)
- [Mou](http://25.io/mou/)
- [Stripe API Docs](https://stripe.com/docs/api)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Microsoft/vscode](https://github.com/Microsoft/vscode)
- [theia-ide/theia](https://github.com/theia-ide/theia)


## Contributing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

##### Available Scripts

In the project directory, you can run:

###### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

###### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

###### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

##### Contribution Resources

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
