import React from "react";
import ReactDOM from "react-dom";
import JSONValidationErrorList from "./JSONValidationErrorList";
import * as monaco from "monaco-editor";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<JSONValidationErrorList markers={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders validation error list with markers", () => {
  const div = document.createElement("div");
  const markers: monaco.editor.IMarker[] = [
    {
      startLineNumber: 2,
      startColumn: 10,
      message: "bad thing",
    } as monaco.editor.IMarker,
  ];
  ReactDOM.render(<JSONValidationErrorList markers={markers} />, div);
  expect(div.innerHTML.includes("2")).toBe(true);
  expect(div.innerHTML.includes("10")).toBe(true);
  expect(div.innerHTML.includes("bad thing")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
