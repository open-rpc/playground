import React from "react";
import ReactDOM from "react-dom";
import ExamplePairings from "./ExamplePairings";
import examples from "@open-rpc/examples";
import refParser from "json-schema-ref-parser";
import { types } from "@open-rpc/meta-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairings />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no example", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairings />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty example", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairings examples={[]}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples", async () => {
  const div = document.createElement("div");
  const simpleMath = await refParser.dereference(examples.simpleMath) as types.OpenRPC;
  ReactDOM.render(<ExamplePairings examples={simpleMath.methods[0].examples as types.ExamplePairingObject[]} />, div);
  expect(div.innerHTML.includes("simpleMathAdditionTwo")).toBe(true);
  expect(div.innerHTML.includes("2")).toBe(true);
  expect(div.innerHTML.includes("4")).toBe(true);
  expect(div.innerHTML.includes("8")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
