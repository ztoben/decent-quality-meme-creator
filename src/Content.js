import React, { useState } from "react";
import FileDropZone from "./FileDropZone";

const contentStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};
const emptyTextNode = {
  text: "",
  options: {},
};
const initialTextNodes = [{ ...emptyTextNode }, { ...emptyTextNode }];

function onChangeSetImageTextNodes(
  setImageTextNodes,
  imageTextNodes,
  value,
  index
) {
  const newImageTextNodes = [...imageTextNodes];

  newImageTextNodes[index].text = value;

  setImageTextNodes(newImageTextNodes);
}

export default function Content() {
  const [imageTextNodes, setImageTextNodes] = useState(initialTextNodes);
  const [imageNodes, setImageNodes] = useState([]);

  return (
    <div css={contentStyle}>
      <p>Text:</p>
      {imageTextNodes.map((imageTextNode, index) => (
        <div key={index} css={{ display: "flex", marginBottom: 10 }}>
          <input
            css={{ flexGrow: 1, padding: 5 }}
            type="text"
            value={imageTextNode?.text}
            onChange={(event) =>
              onChangeSetImageTextNodes(
                setImageTextNodes,
                imageTextNodes,
                event.target.value,
                index
              )
            }
          />
          <button
            type="button"
            onClick={() => {
              const newTextNodes = [...imageTextNodes];
              newTextNodes.splice(index, 1);

              setImageTextNodes(newTextNodes);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setImageTextNodes([...imageTextNodes, { ...emptyTextNode }])
        }
      >
        + Add Text
      </button>
      <p>Images:</p>
      <FileDropZone setImageNodes={setImageNodes} imageNodes={imageNodes} />
      <p>Meme:</p>
      <div
        css={{
          position: "relative",
          width: "100%",
          minHeight: 500,
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Meme will go here...</p>
      </div>
    </div>
  );
}
