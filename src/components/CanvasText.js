import React, { useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva";
import { RGBAToHexA } from "../helpers";

export default function CanvasText({
  textProps,
  fontOptions,
  isSelected,
  onSelect,
  onUnSelect,
  onChange,
  width,
}) {
  const transformerRef = useRef();
  const textContainerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([textContainerRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        ref={textContainerRef}
        width={width}
        {...textProps}
        {...fontOptions}
        fill={RGBAToHexA(fontOptions.fill)}
        stroke={RGBAToHexA(fontOptions.stroke)}
        onClick={() => (!isSelected ? onSelect() : onUnSelect())}
        onTap={() => (!isSelected ? onSelect() : onUnSelect())}
        onDragEnd={(e) => {
          onChange({
            ...textProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransform={(e) => {
          const node = textContainerRef.current;
          const anchorName = node.getStage()?.findOne("Transformer")
            ._movingAnchorName;
          const changingWidth =
            anchorName === "middle-left" || anchorName === "middle-right";
          const changingHeight =
            anchorName === "top-center" || anchorName === "bottom-center";

          if (changingWidth) {
            const scale = node.scaleX();
            node.width(Math.max(node.width() * scale, node.fontSize()));
            node.scaleX(1);
          }

          if (changingHeight) {
            const scale = node.scaleY();
            node.height(Math.max(node.height() * scale, node.fontSize()));
            node.scaleY(1);
          }
        }}
        onTransformEnd={(e) => {
          const node = textContainerRef.current;
          const scale = node.scaleX();
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          const width = Math.max(5, node.width() * scaleX);
          const height = Math.max(node.height() * scaleY);

          onChange({
            ...textProps,
            fontSize: node.fontSize() * scale,
            x: node.x(),
            y: node.y(),
            width,
            height,
          });
        }}
      />
      {isSelected && (
        <Transformer
          enabledAnchors={[
            "middle-left",
            "middle-right",
            "top-center",
            "bottom-center",
          ]}
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
