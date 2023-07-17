import React from "react";

function Block(props) {
  const { mark, onClick, position } = props;
  let showDesign = mark === 1 ? "cross" : mark === 2 ? "dot" : "";

  return (
    <div
      className={`block ${showDesign}`}
      onClick={() => {
        onClick(position);
      }}
    />
  );
}

export default Block;
