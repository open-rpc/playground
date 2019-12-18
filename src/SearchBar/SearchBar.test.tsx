import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchBar searchBarUrl={undefined}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders uiSchema inputPlaceholder", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchBar searchBarUrl={undefined} uiSchema={{
    appBar: {
      "ui:inputPlaceholder": "enter url",
    },
  } as any} />, div);

  expect(div.innerHTML.includes("enter url")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
