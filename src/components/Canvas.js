import React, { useRef, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import BaseImage from "./BaseImage";
import { handleSaveImage } from "../helpers";

const heightWidthContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: 5,
};

export default function Canvas({
  imageNodes,
  setImageNodes,
  textNodes,
  fontOptions,
}) {
  const [selectedId, selectShape] = useState(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const stageRef = useRef();

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <>
      <div css={heightWidthContainerStyle}>
        <div>
          <span>Height:</span>
          <input
            type="text"
            value={height}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setHeight(e.target.value.replace(/\D/, ""))}
          />
        </div>
        <div>
          <span>Width:</span>
          <input
            type="text"
            value={width}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setWidth(e.target.value.replace(/\D/, ""))}
          />
        </div>
      </div>
      <div
        css={{
          position: "relative",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
                <BaseImage
                  imageProps={imageNode}
                  draggable={true}
                  src={imageNode.src}
                  isSelected={imageNode.id === selectedId}
                  onSelect={() => {
                    selectShape(imageNode.id);
                  }}
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
              <Text
                {...textNode}
                {...fontOptions}
                y={index * 20}
                width={width}
              />
            </Layer>
          ))}
        </Stage>
      </div>
      <button
        css={{ marginTop: 10 }}
        type="button"
        onClick={() => handleSaveImage(stageRef)}
      >
        Save
      </button>
    </>
  );
}
