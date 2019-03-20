import React from "react";
import ReactDOM from "react-dom";
import Documentation from "./Documentation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Documentation schema={{} as any}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
