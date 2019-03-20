import React from "react";
import ReactDOM from "react-dom";
import JSONSchema from "./JSONSchema";
import { JSONSchema4 } from "json-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<JSONSchema />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  const emptySchema = {} as JSONSchema4;
  ReactDOM.render(<JSONSchema schema={emptySchema}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});
