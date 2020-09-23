import React, { useRef, useState } from "react";
import CustomSketchPicker from "./CustomSketchPicker";
import { FaBorderStyle, FaFillDrip } from "@meronex/icons/fa";
import { buttonStyle } from "../styles";

const colorPickerButtonStyle = {
  ...buttonStyle,
  width: 25,
  height: 25,
};
const coverStyle = {
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
};

function getBackgroundColor(selectedColor) {
  return `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`;
}

function getColor({ r, g, b }) {
  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return "#000000";

  return "#ffffff";
}

export default function ColorPickerButton({
  selectedColor,
  setSelectedColor,
  type,
}) {
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
          backgroundColor: getBackgroundColor(selectedColor),
          color: getColor(selectedColor),
        }}
        onClick={() => setIsColorPickerOpen(true)}
      >
        {"fill" === type && <FaFillDrip />}
        {"stroke" === type && <FaBorderStyle />}
      </button>
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
