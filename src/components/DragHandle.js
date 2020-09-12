import React from "react";

export default function DragHandle() {
  return (
    <div
      css={{
        width: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>≡</span>
    </div>
  );
}
