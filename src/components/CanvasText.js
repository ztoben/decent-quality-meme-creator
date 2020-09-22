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
        onTransformEnd={(e) => {
          const node = textContainerRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          const width = Math.max(5, node.width() * scaleX);
          const height = Math.max(node.height() * scaleY);

          console.log(node);

          onChange({
            ...textProps,
            x: node.x(),
            y: node.y(),
            width,
            height,
          });
        }}
      />
      {isSelected && (
        <Transformer
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
