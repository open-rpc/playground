import React from "react";
import ReactDOM from "react-dom";
import PlaygroundSplitPane from "./PlaygroundSplitPane";
import * as monaco from "monaco-editor";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PlaygroundSplitPane
    left={
      <div>Foo</div>
    }
    right={
      <div>Bar</div>
    }
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders playground with left and right with split true", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PlaygroundSplitPane
    split={true}
    left={
      <div>Foo</div>
    }
    right={
      <div>Bar</div>
    }
  />, div);
  expect(div.innerHTML.includes("Foo")).toBe(true);
  expect(div.innerHTML.includes("Bar")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders playground without left when split is false", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PlaygroundSplitPane
    split={false}
    onlyRenderSplit={true}
    left={
      <div>Foo</div>
    }
    right={
      <div>Bar</div>
    }
  />, div);
  expect(div.innerHTML.includes("Foo")).toBe(false);
  expect(div.innerHTML.includes("Bar")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
