import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { FaExpand } from "react-icons/fa";
import { getImageDimensions, handleSaveImage } from "../helpers";
import CanvasImage from "./CanvasImage";
import CanvasText from "./CanvasText";
import IconButton from "./IconButton";

const heightWidthContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: 5,
};

export default function Canvas({
  imageNodes,
  setImageNodes,
  textNodes,
  setTextNodes,
  fontOptions,
}) {
  const [selectedId, selectShape] = useState(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const stageRef = useRef();

  const matchCanvasSizeToImages = async () => {
    let maxWidth = 0;
    let maxHeight = 0;

    for await (let imageNode of imageNodes) {
      const { w: tempW, h: tempH } = await getImageDimensions(imageNode.src);

      if (tempW > maxWidth) maxWidth = tempW;
      if (tempH > maxHeight) maxHeight = tempH;
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
      <div css={heightWidthContainerStyle}>
        <div>
          <span>Height:</span>
          <input
            css={{ height: 21 }}
            type="number"
            value={height}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setHeight(e.target.value.replace(/\D/, ""))}
          />
        </div>
        <div>
          <span>Width:</span>
          <input
            css={{ height: 21 }}
            type="number"
            value={width}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setWidth(e.target.value.replace(/\D/, ""))}
          />
        </div>
        <IconButton onClick={() => matchCanvasSizeToImages()}>
          <FaExpand />
        </IconButton>
      </div>
      <div
        css={{
          position: "relative",
          border: "1px solid black",
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
        css={{ marginTop: 10 }}
        type="button"
        onClick={() => handleSaveImage(stageRef)}
      >
        Save
      </button>
    </>
  );
}
