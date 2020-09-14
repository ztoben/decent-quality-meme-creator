import React, { useEffect, useRef } from "react";
import TextNodeOptionsSelector from "./TextNodeOptionsSelector";
import DragHandle from "./DragHandle";

function onChangeSetTextNodes(setTextNodes, textNodes, value, index) {
  const newTextNodes = [...textNodes];

  newTextNodes[index].text = value;

  setTextNodes(newTextNodes);
}

const textAreaStyle = {
  fontFamily: "inherit",
  fontSize: 14,
  margin: "3px 3px 3px 0",
  flexGrow: 1,
  padding: 5,
  resize: "none",
  "&:focus": {
    outline: "none",
  },
};

export default function TextArea({ textNode, setTextNodes, textNodes, index }) {
  const textareaRef = useRef(null);
  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [textNode.text]);

  return (
    <>
      <DragHandle />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <textarea
          ref={textareaRef}
          css={textAreaStyle}
          placeholder="Enter text here..."
          value={textNode.text}
          onChange={(event) =>
            onChangeSetTextNodes(
              setTextNodes,
              textNodes,
              event.target.value,
              index
            )
          }
        />
        <TextNodeOptionsSelector
          index={index}
          textNodes={textNodes}
          setTextNodes={setTextNodes}
        />
      </div>
    </>
  );
}
