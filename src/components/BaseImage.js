import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";

export default function BaseImage({
  imageProps,
  draggable,
  isSelected,
  onSelect,
  onChange,
}) {
  const { src, x, y, width, height } = imageProps;
  const loadImage = useCallback(() => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    imageRef.current = img;
    imageRef.current.addEventListener("load", handleLoad);
  }, [src]);
  const [image, setImage] = useState(null);
  const transformerRef = useRef();
  const imageContainerRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    loadImage();
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, [loadImage]);

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([imageContainerRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    loadImage();
  }, [loadImage, src]);

  function handleLoad() {
    setImage(imageRef.current);
  }

  return (
    <>
      <Image
        ref={imageContainerRef}
        x={x}
        y={y}
        width={width}
        height={height}
        image={image}
        draggable={draggable}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...imageProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = imageContainerRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          const width = Math.max(5, node.width() * scaleX);
          const height = Math.max(node.height() * scaleY);

          console.log({ width, height });

          onChange({
            ...imageProps,
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
