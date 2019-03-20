import React from "react";
import ReactDOM from "react-dom";
import Info from "./Info";
import { types } from "@open-rpc/meta-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Info />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Info />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Info schema={{} as types.OpenRPC}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema info", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Info schema={{ info: {} } as types.OpenRPC}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders an info.title for a given schema", () => {
  const div = document.createElement("div");
  const schema = {
    info: {
      title: "foo",
    },
  } as types.OpenRPC;
  ReactDOM.render(<Info schema={schema} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders an info.version for a given schema", () => {
  const div = document.createElement("div");
  const schema = {
    info: {
      version: "1.0.0-rc0",
    },
  } as types.OpenRPC;
  ReactDOM.render(<Info schema={schema} />, div);
  expect(div.innerHTML.includes("1.0.0-rc0")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders an info.description for a given schema", () => {
  const div = document.createElement("div");
  const schema = {
    info: {
      description: "my long verbose description",
    },
  } as types.OpenRPC;
  ReactDOM.render(<Info schema={schema} />, div);
  expect(div.innerHTML.includes("my long verbose description")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders an info terms of service for a given schema", () => {
  const div = document.createElement("div");
  const schema = {
    info: {
      termsOfService: "http://open-rpc.org",
    },
  } as types.OpenRPC;
  ReactDOM.render(<Info schema={schema} />, div);
  expect(div.innerHTML.includes('"http://open-rpc.org"')).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders an info contact for a given schema", () => {
  const div = document.createElement("div");
  const schema = {
    info: {
      contact: {
        email: "foo@example.com",
        name: "OpenRPC Team",
        url: "http://open-rpc.org",
      },
    },
  } as types.OpenRPC;
  ReactDOM.render(<Info schema={schema} />, div);
  expect(div.innerHTML.includes("OpenRPC Team")).toBe(true);
  expect(div.innerHTML.includes('"http://open-rpc.org"')).toBe(true);
  expect(div.innerHTML.includes("mailto:foo@example.com")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders an info license for a given schema", () => {
  const div = document.createElement("div");
  const schema = {
    info: {
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org",
      },
    },
  };
  ReactDOM.render(<Info schema={schema as any} />, div);
  expect(div.innerHTML.includes("http://www.apache.org")).toBe(true);
  expect(div.innerHTML.includes("Apache 2.0")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
