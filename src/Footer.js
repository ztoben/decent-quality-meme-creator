import React from "react";
import { css } from "@emotion/core";

const footerStyle = css`
   {
    a {
      color: blue;
      text-decoration: none;
    }

    a:link,
    a:visited {
      color: blue;
    }
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyle}>
      Created by <a href="https://toben.dev">Zach Toben</a>
    </footer>
  );
}
