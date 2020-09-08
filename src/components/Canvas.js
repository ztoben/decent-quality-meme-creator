import React, { useRef } from "react";
import { Layer, Stage, Text } from "react-konva";
import BaseImage from "./BaseImage";
import { handleSaveImage } from "../helpers";

export default function Canvas({ imageNodes, imageTextNodes }) {
  const stageRef = useRef();

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
        <Stage ref={stageRef} width={500} height={500}>
          {imageNodes.map((imageNode, index) => {
            console.log(imageNode.name);

            return (
              <Layer key={`image-${index}`}>
                <BaseImage draggable={true} src={imageNode.src} />
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
