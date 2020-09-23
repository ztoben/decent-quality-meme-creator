import React from "react";
import IconButton from "./IconButton";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaMinus,
  FaPlus,
} from "@meronex/icons/fa";
import ColorPickerButton from "./ColorPickerButton";
import FontSelect from "./FontSelect";

const fontOptionsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 5,
};
const fontOptionsInnerContainerStyle = {
  display: "flex",
  alignItems: "center",
};
const fontSizeInputStyle = {
  width: 19,
  height: 19,
  textAlign: "center",
  padding: 0,
  margin: 0,
};

export default function FontOptionsSelector({ fontOptions, setFontOptions }) {
  const setFontOption = (option, value) =>
    setFontOptions({
      ...fontOptions,
      [option]: value,
    });

  return (
    <div css={fontOptionsContainerStyle}>
      <div css={fontOptionsInnerContainerStyle}>
        <IconButton
          onClick={() => {
            const fontSize = fontOptions.fontSize - 1;

            if (fontSize > 0) {
              setFontOptions({
                ...fontOptions,
                fontSize,
              });
            }
          }}
        >
          <FaMinus />
        </IconButton>
        <input
          css={fontSizeInputStyle}
          type="text"
          value={fontOptions.fontSize}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            setFontOptions({
              ...fontOptions,
              fontSize: e.target.value.replace(/\D/, ""),
            });
          }}
        />
        <IconButton
          onClick={() => {
            const fontSize = fontOptions.fontSize + 1;

            if (fontSize > 0) {
              setFontOptions({
                ...fontOptions,
                fontSize,
              });
            }
          }}
        >
          <FaPlus />
        </IconButton>
        <FontSelect fontOptions={fontOptions} setFontOptions={setFontOptions} />
      </div>
      <div css={fontOptionsInnerContainerStyle}>
        <ColorPickerButton
          type="fill"
          selectedColor={fontOptions.fill}
          setSelectedColor={(color) => setFontOption("fill", color)}
        />
        <ColorPickerButton
          type="stroke"
          selectedColor={fontOptions.stroke}
          setSelectedColor={(color) => setFontOption("stroke", color)}
        />
        <IconButton
          selected={fontOptions.align === "left"}
          onClick={() => setFontOption("align", "left")}
        >
          <FaAlignLeft />
        </IconButton>
        <IconButton
          selected={fontOptions.align === "center"}
          onClick={() => setFontOption("align", "center")}
        >
          <FaAlignCenter />
        </IconButton>
        <IconButton
          selected={fontOptions.align === "right"}
          onClick={() => setFontOption("align", "right")}
        >
          <FaAlignRight />
        </IconButton>
      </div>
    </div>
  );
}
