import React from "react";
import ReactDOM from "react-dom";
import ContentDescriptor from "./ContentDescriptor";
import { types } from "@open-rpc/meta-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ContentDescriptor />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ContentDescriptor />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  const emptyContentDescriptor = {} as types.ContentDescriptorObject;
  ReactDOM.render(<ContentDescriptor contentDescriptor={emptyContentDescriptor}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a name", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ContentDescriptor contentDescriptor={{name: "foo"}}/>, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
