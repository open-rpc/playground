# OpenRPC Playground
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=open-rpc/playground)](https://dependabot.com)

![openrpc-playground-screenshot](https://user-images.githubusercontent.com/364566/60648033-ef5d6580-9df3-11e9-8b48-5e239f0c7574.png)

This is a tool for editing, validating and previewing [OpenRPC documents](https://spec.open-rpc.org/#openrpc-document).


## What is it?
This is meant to be an all-in-one developer portal for [OpenRPC documents](https://spec.open-rpc.org/#openrpc-document). It includes an editor and a live-preview of the documentation.

This helps developers visualize the OpenRPC and iterate very quickly on creating [OpenRPC documents](https://spec.open-rpc.org/#openrpc-document) via the built in editor tooling.

## Usage

Navigate to [playground.open-rpc.org](https://playground.open-rpc.org/) and start playing around. You can build your own OpenRPC document, validate existing documents quickly, or use the [examples](https://github.com/open-rpc/examples).

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
- disable the appbar splitView
  - `http://playground.open-rpc.org/?uiSchema[appBar][ui:edit]=false`
- hide appbar input bar
  - `http://playground.open-rpc.org/?uiSchema[appBar][ui:input]=false`
- hide appbar examples dropdown
  - `http://playground.open-rpc.org/?uiSchema[appBar][ui:examplesDropdown]=false`
- hide appbar transports
  - `http://playground.open-rpc.org/?uiSchema[appBar][ui:transports]=false`
- provide custom name and logo
- `http://playground.open-rpc.org/?uiSchema[appBar][ui:title]=My Site&uiSchema[appBar][ui:logoUrl]=https://github.com/open-rpc/design/raw/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/128x128.png`

#### Pro tip

If you want to use the content of a __Github Gist__ with the playground, you can:
- use the _latest revision_ for a Gist file
```
https://playground.open-rpc.org/?schemaUrl=https://gist.githubusercontent.com/[gist username]/[gist ID]/raw/[file name]
```

- use a _specific revision_ for a Gist file:
```
https://playground.open-rpc.org/?schemaUrl=https://gist.githubusercontent.com/[gist username]/[gist ID]/raw/[gist commit ID]/[file name]
```

## Configuration via Environment Variables

If you require to have different default values for the `uiSchema`, `schemaUrl` or some other labels in the page that are not part of the `uiSchema`, you can use the below environment variables in your desired `.env` files before starting the app or before building it:


| Variable    | Description |
| ----------- | ----------- |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_INPUT | Default value for `uiSchema[appBar][ui:input]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_INPUTPLACEHOLDER | Default value for `uiSchema[appBar][ui:inputPlaceholder]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_LOGOURL | Default value for `uiSchema[appBar][ui:logoUrl]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_SPLITVIEW | Default value for `uiSchema[appBar][ui:splitView]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_DARKMODE | Default value for `uiSchema[appBar][ui:darkMode]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TITLE | Default value for `uiSchema[appBar][ui:title]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EXAMPLESDROPDOWN | Default value for `uiSchema[appBar][ui:examplesDropdown]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EDIT | Default value for `uiSchema[appBar][ui:edit]` |
| REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TRANSPORTS | Default value for `uiSchema[appBar][ui:transports]` |
| REACT_APP_DEFAULT_UISCHEMA_METHODS_UI_DEFAULTEXPANDED | Default value for `uiSchema[methods][ui:defaultExpanded]` |
| REACT_APP_DEFAULT_UISCHEMA_METHODS_UI_METHODPLUGINS | Default value for `uiSchema[methods][ui:methodPlugins]` |
| REACT_APP_DEFAULT_UISCHEMA_PARAMS_UI_DEFAULTEXPANDED | Default value for `uiSchema[params][ui:defaultExpanded]` |
| REACT_APP_DEFAULT_SCHEMAURL | Default value for `schemaUrl` |
| REACT_APP_EXAMPLE_DOCUMNETS_DROPDOWN_TITLE | Default title value for the examples drop-down |
| REACT_APP_EXAMPLE_DOCUMNETS_DROPDOWN_TEXT | Default text value for the examples drop-down |
| REACT_APP_EXAMPLE_DOCUMNETS_DROPDOWN_LIST | Default list of examples |

*.env.development for a view only case*
```
REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_INPUT=false
REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_LOGOURL="https://www.shutterstock.com/image-vector/abstract-initial-letter-s-logo-260nw-1862762845.jpg"
REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_SPLITVIEW=false
REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TITLE="Company Services"
REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EXAMPLESDROPDOWN=true
REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_EDIT=false
REACT_APP_DEFAULT_UISCHEMA_APPBAR_UI_TRANSPORTS=false
REACT_APP_DEFAULT_SCHEMAURL="https://raw.githubusercontent.com/open-rpc/examples/master/service-descriptions/petstore-openrpc.json"
REACT_APP_EXAMPLE_DOCUMNETS_DROPDOWN_TITLE="Deployed Services"
REACT_APP_EXAMPLE_DOCUMNETS_DROPDOWN_TEXT="Deployed Services"
REACT_APP_EXAMPLE_DOCUMNETS_DROPDOWN_LIST=[{"name":"Pet Store","url":"https://raw.githubusercontent.com/open-rpc/examples/master/service-descriptions/petstore-openrpc.json"},{"name":"Shipping Service","url":"https://myserver.com/shipping/openrpc.json"},{"name":"Order Service","url":"https://myserver.com/order/openrpc.json"}]
```

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
