import React from "react";
import ReactDOM from "react-dom";
import Methods from "./Methods";
import { types } from "@open-rpc/meta-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods schema={{} as any}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema methods", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods schema={{ methods: [] } as any}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods name", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        name: "get_pet",
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any}/>, div);
  expect(div.innerHTML.includes("get_pet")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods summary", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        description: "verbose get_pet description",
        name: "get_pet",
        params: [],
        summary: "a short summary",
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any}/>, div);
  expect(div.innerHTML.includes("a short summary")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods description", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        description: "verbose get_pet description",
      },
    ],
  } as types.OpenRPC;
  ReactDOM.render(<Methods schema={schema}/>, div);
  expect(div.innerHTML.includes("verbose get_pet description")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods params", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any}/>, div);
  expect(div.innerHTML.includes("foobarz")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods result", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        result: {
          schema: {
            properties: {
              id: {
                format: "int64",
                type: "integer",
              },
              name: {
                type: "string",
              },
              tag: {
                type: "string",
              },
            },
            required: [
              "id",
            ],
          },
        },
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any}/>, div);
  expect(div.innerHTML.includes("name")).toBe(true);
  expect(div.innerHTML.includes("tag")).toBe(true);
  expect(div.innerHTML.includes("id")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
