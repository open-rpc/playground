import React from "react";
import ReactDOM from "react-dom";
import ExamplePairing from "./ExamplePairing";
import examples from "@open-rpc/examples";
import refParser from "json-schema-ref-parser";
import { types } from "@open-rpc/meta-schema";

it("renders examples", async () => {
  const div = document.createElement("div");
  const simpleMath = await refParser.dereference(examples.simpleMath) as types.OpenRPC;
  ReactDOM.render(<ExamplePairing method={simpleMath.methods[0]} examplePosition={0} />, div);
  expect(div.innerHTML.includes("2")).toBe(true);
  expect(div.innerHTML.includes("4")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
