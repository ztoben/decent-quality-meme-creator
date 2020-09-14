import React, { useState } from "react";
import { getInitialTextNodes } from "../helpers";
import FileDropZone from "./FileDropZone";
import TextNodesList from "./TextNodesList";
import { contentStyle } from "../styles";
import Canvas from "./Canvas";
import FontOptionsSelector from "./FontOptionsSelector";

const defaultFontOptions = {
  fontFamily: "Impact",
  fontSize: 40,
  fill: {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  },
  stroke: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  align: "center",
};

export default function Content() {
  const [textNodes, setTextNodes] = useState(getInitialTextNodes);
  const [imageNodes, setImageNodes] = useState([]);
  const [fontOptions, setFontOptions] = useState(defaultFontOptions);

  return (
    <div css={contentStyle}>
      <p>Text:</p>
      <FontOptionsSelector
        fontOptions={fontOptions}
        setFontOptions={setFontOptions}
      />
      <TextNodesList textNodes={textNodes} setTextNodes={setTextNodes} />
      <p>Images:</p>
      <FileDropZone setImageNodes={setImageNodes} imageNodes={imageNodes} />
      <p>Meme:</p>
      <Canvas
        textNodes={textNodes}
        fontOptions={fontOptions}
        imageNodes={imageNodes}
        setImageNodes={setImageNodes}
      />
    </div>
  );
}
