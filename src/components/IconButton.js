import React from "react";

const buttonStyle = {
  display: "flex",
  padding: 5,
  justifyContent: "center",
  margin: 2,
  borderRadius: 0,
  boxShadow: "none",
  cursor: "pointer",
};

export default function IconButton({ children, onClick, selected }) {
  return (
    <button
      css={{
        ...buttonStyle,
        ...(selected && {
          backgroundColor: "gray",
        }),
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
