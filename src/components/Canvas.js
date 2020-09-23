import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import {
  FaExpand,
  FaRedo,
  FaSave,
  FaShare,
  FaTrashAlt,
  FaUndo,
} from "@meronex/icons/fa";
import { getImageDimensions, handleSaveImage, resetCanvas } from "../helpers";
import CanvasImage from "./CanvasImage";
import CanvasText from "./CanvasText";
import IconButton from "./IconButton";
import { buttonStyle } from "../styles";
import { DEFAULT_CANVAS_SIZE } from "../constants";

const canvasControlContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: 5,
};
const canvasControlStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const canvasControlInputStyle = {
  height: 18,
};
const canvasControlLabelStyle = {
  fontSize: 12,
};

export default function Canvas({
  imageNodes,
  setImageNodes,
  textNodes,
  setTextNodes,
  fontOptions,
}) {
  const [selectedId, selectShape] = useState(null);
  const [width, setWidth] = useState(DEFAULT_CANVAS_SIZE);
  const [height, setHeight] = useState(DEFAULT_CANVAS_SIZE);
  const stageRef = useRef();

  const matchCanvasSizeToImages = async () => {
    let maxWidth = 0;
    let maxHeight = 0;

    for await (let imageNode of imageNodes) {
      const { w: tempW, h: tempH } = await getImageDimensions(imageNode.src);
      const x = imageNode.x || 0;
      const y = imageNode.y || 0;

      if (tempW + x > maxWidth) maxWidth = tempW + x;
      if (tempH + y > maxHeight) maxHeight = tempH + y;
    }

    setWidth(maxWidth);
    setHeight(maxHeight);
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <>
      <div css={canvasControlContainerStyle}>
        <div css={canvasControlStyle}>
          <span css={canvasControlLabelStyle}>Height:</span>
          <input
            css={canvasControlInputStyle}
            value={height}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setHeight(e.target.value.replace(/\D/, ""))}
          />
        </div>
        <div css={canvasControlStyle}>
          <span css={canvasControlLabelStyle}>Width:</span>
          <input
            css={canvasControlInputStyle}
            value={width}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setWidth(e.target.value.replace(/\D/, ""))}
          />
        </div>
        <div css={canvasControlStyle}>
          <IconButton onClick={() => alert("Not yet implemented.")}>
            <FaUndo />
          </IconButton>
          <IconButton onClick={() => alert("Not yet implemented.")}>
            <FaRedo />
          </IconButton>
          <IconButton onClick={() => matchCanvasSizeToImages()}>
            <FaExpand />
          </IconButton>
          <IconButton
            onClick={() => {
              if (
                window.confirm("Are you sure you want to reset the canvas?")
              ) {
                resetCanvas(setTextNodes, setImageNodes, setWidth, setHeight);
              }
            }}
          >
            <FaTrashAlt />
          </IconButton>
        </div>
      </div>
      <div
        css={{
          position: "relative",
          border: "1px solid black",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width,
          height,
        }}
      >
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          {imageNodes.map((imageNode, index) => {
            return (
              <Layer key={`image-${index}`}>
                <CanvasImage
                  imageProps={imageNode}
                  draggable={true}
                  src={imageNode.src}
                  isSelected={imageNode.id === selectedId}
                  onSelect={() => selectShape(imageNode.id)}
                  onUnSelect={() => selectShape(null)}
                  onChange={(newAttrs) => {
                    const newImageNodes = imageNodes.slice();
                    newImageNodes[index] = newAttrs;
                    setImageNodes(newImageNodes);
                  }}
                />
              </Layer>
            );
          })}
          {textNodes.map((textNode, index) => (
            <Layer key={`text-${index}`}>
              <CanvasText
                textProps={textNode}
                fontOptions={fontOptions}
                width={width}
                isSelected={textNode.id === selectedId}
                onSelect={() => selectShape(textNode.id)}
                onUnSelect={() => selectShape(null)}
                onChange={(newAttrs) => {
                  const newTextNodes = textNodes.slice();
                  newTextNodes[index] = newAttrs;
                  setTextNodes(newTextNodes);
                }}
              />
            </Layer>
          ))}
        </Stage>
      </div>
      <button
        css={{ ...buttonStyle, margin: "10px 0 0" }}
        type="button"
        onClick={() => handleSaveImage(stageRef)}
      >
        <FaSave css={{ marginRight: 5 }} />
        Save
      </button>
      <button
        css={{ ...buttonStyle, margin: "5px 0 0" }}
        type="button"
        onClick={() => alert("Not yet implemented.")}
      >
        <FaShare css={{ marginRight: 5 }} />
        Share
      </button>
    </>
  );
}
