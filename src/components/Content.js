import React, { useState } from "react";
import { getInitialTextNodes } from "../helpers";
import FileDropZone from "./FileDropZone";
import TextNodesList from "./TextNodesList";
import { contentStyle } from "../styles";
import Canvas from "./Canvas";

export default function Content() {
  const [textNodes, setTextNodes] = useState(getInitialTextNodes);
  const [imageNodes, setImageNodes] = useState([]);

  return (
    <div css={contentStyle}>
      <p>Text:</p>
      <TextNodesList textNodes={textNodes} setTextNodes={setTextNodes} />
      <p>Images:</p>
      <FileDropZone setImageNodes={setImageNodes} imageNodes={imageNodes} />
      <p>Meme:</p>
      <Canvas
        textNodes={textNodes}
        imageNodes={imageNodes}
        setImageNodes={setImageNodes}
      />
    </div>
  );
}
