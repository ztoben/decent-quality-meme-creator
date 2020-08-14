import { css, Global } from "@emotion/core";
import React from "react";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        body {
          background: lightgray;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          max-width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}
    />
  );
}
