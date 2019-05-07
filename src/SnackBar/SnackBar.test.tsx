import React from "react";
import ReactDOM from "react-dom";
import {SnackBar, NotificationType} from "./SnackBar";
it("renders notifications", () => {
  const div = document.createElement("div");
  for (const notificationType in NotificationType) {
    if ( typeof  notificationType === "string") {
    const type = NotificationType[notificationType] as NotificationType;
    ReactDOM.render(<SnackBar close={null} notification={{ message: "hello", type}} />, div);
    expect(div.innerHTML.includes("hello")).toBe(true);
    ReactDOM.unmountComponentAtNode(div);
    } else {
      throw new Error("NotificationType contains mixed types");
    }
 }
});
