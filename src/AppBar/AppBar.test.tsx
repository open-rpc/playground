import React from "react";
import ReactDOM from "react-dom";
import AppBar from "./AppBar";

import mediaQuery from "css-mediaquery";

function createMatchMedia(width: any) {
  return (query: any) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {
      // noop
    },
    removeListener: () => {
      // noop
    },
  });
}

describe("Appbar", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth) as any;
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AppBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders uiSchema logo", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AppBar uiSchema={{
      appBar: {
        "ui:logoUrl": "http://foo.salad",
      },
    } as any} />, div);
    expect(div.innerHTML.includes("foo.salad")).toBe(true);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders uiSchema title", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AppBar uiSchema={{
      appBar: {
        "ui:title": "foobar",
      },
    } as any} />, div);
    expect(div.innerHTML.includes("foobar")).toBe(true);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders uiSchema inputPlaceholder", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AppBar uiSchema={{
      appBar: {
        "ui:input": true,
        "ui:inputPlaceholder": "enter url",
      },
    } as any} />, div);
    console.log("div.", div.innerHTML); //tslint:disable-line
    expect(div.innerHTML.includes("enter url")).toBe(true);
    ReactDOM.unmountComponentAtNode(div);
  });
});
