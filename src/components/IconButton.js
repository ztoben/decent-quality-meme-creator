import React from "react";
import { buttonStyle } from "../styles";

export default function IconButton({
  children,
  onClick,
  selected,
  style = {},
}) {
  return (
    <button
      css={{
        ...buttonStyle,
        ...style,
        ...(selected && {
          backgroundColor: "gray",
        }),
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
