import SplitPane from "react-split-pane";
import React, { useState } from "react";
import { Component } from "react";

interface IProps {
  onChange?: (size: number) => any;
  left: JSX.Element;
  right: JSX.Element;
  split: boolean;
}

const PlaygroundSplitPane: React.FC<IProps> = (props) => {
  const handleChange = (size: number) => {
    if (props.onChange) {
      props.onChange(size);
    }
  };

  if (props.split === false) {
    return (
      <div className="docs" key={2}>
        {props.right}
      </div>
    );
  }

  return (
    <SplitPane
      split="vertical"
      minSize={100}
      maxSize={-100}
      defaultSize={window.innerWidth / 2}
      onChange={handleChange}>
      <div key={1} style={{ display: "flex", flexDirection: "column", height: "100%" }} >
        {props.left}
      </div>
      <div className="docs" key={2}>
        {props.right}
      </div>
    </SplitPane>
  );
};

export default PlaygroundSplitPane;
