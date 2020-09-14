import React, { useRef, useState } from "react";
import CustomSketchPicker from "./CustomSketchPicker";

const colorPickerButtonStyle = {
  width: 25,
  height: 25,
  margin: 2,
  cursor: "pointer",
};
const coverStyle = {
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
};

export default function ColorPickerButton({ selectedColor, setSelectedColor }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const buttonRef = useRef(null);

  const getPopOverStyle = () => {
    const boundingRect = buttonRef.current.getBoundingClientRect();

    return {
      position: "absolute",
      zIndex: "2",
      top: boundingRect.top,
      left: boundingRect.right - boundingRect.width - 195,
    };
  };

  return (
    <>
      <button
        ref={buttonRef}
        css={{
          ...colorPickerButtonStyle,
          backgroundColor: `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`,
        }}
        onClick={() => setIsColorPickerOpen(true)}
      />
      {isColorPickerOpen && (
        <div css={getPopOverStyle()}>
          <div css={coverStyle} onClick={() => setIsColorPickerOpen(false)} />
          <CustomSketchPicker
            color={selectedColor}
            onChange={({ rgb }) => setSelectedColor(rgb)}
            onClose={() => setIsColorPickerOpen(false)}
          />
        </div>
      )}
    </>
  );
}
