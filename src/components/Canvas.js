import React, { useRef, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import BaseImage from "./BaseImage";
import { handleSaveImage } from "../helpers";

export default function Canvas({ imageNodes, setImageNodes, imageTextNodes }) {
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef();

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <>
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
        <Stage
          ref={stageRef}
          width={500}
          height={500}
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
          {imageTextNodes.map((imageTextNode, index) => (
            <Layer key={`text-${index}`}>
              <Text text={imageTextNode.text} y={index * 20} draggable />
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
