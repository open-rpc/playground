import React from "react";
import ReactDOM from "react-dom";
import Errors from "./Errors";

it("renders with error", () => {
  const div = document.createElement("div");
  const errors = [
    {
      code: 100,
      message: "lost it",
    },
  ];
  ReactDOM.render(<Errors errors={errors}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders an error", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<Errors errors={[{
    code: 100,
    message: "foo bar error msg",
  }]} />, div);
  expect(div.innerHTML.includes("foo bar error msg")).toBe(true);
  expect(div.innerHTML.includes("100")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
