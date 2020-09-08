import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "react-konva";

export default function BaseImage({ src, x, y, draggable }) {
  const loadImage = useCallback(() => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    imageRef.current = img;
    imageRef.current.addEventListener("load", handleLoad);
  }, [src]);
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadImage();
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, [loadImage]);

  useEffect(() => {
    loadImage();
  }, [loadImage, src]);

  function handleLoad() {
    setImage(imageRef.current);
  }

  return <Image x={x} y={y} image={image} draggable={draggable} />;
}
