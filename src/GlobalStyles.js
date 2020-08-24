import { css, Global } from "@emotion/core";
import React from "react";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          max-width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        #root {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 10px 0;
          flex: 1;
          max-width: 500px;
          width: 100%;
        }
      `}
    />
  );
}
