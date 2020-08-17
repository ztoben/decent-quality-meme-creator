import React from "react";

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

export default function Content() {
  return (
    <div css={contentStyle}>
      <p>A work in progress...</p>
      <img
        src="/images/build-all-the-things.png"
        alt="Build All The Things!"
        width={400}
      />
    </div>
  );
}
