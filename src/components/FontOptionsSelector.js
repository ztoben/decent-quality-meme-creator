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

const FontButton = ({ fontLabel, fontFamily, setFontOptions, fontOptions }) => {
  return (
    <IconButton
      onClick={() => setFontOptions({ ...fontOptions, fontFamily })}
      selected={fontOptions.fontFamily === fontFamily}
    >
      {fontLabel}
    </IconButton>
  );
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
        <FontButton
          fontLabel="Impact"
          fontFamily="Impact"
          fontOptions={fontOptions}
          setFontOptions={setFontOptions}
        />
        <FontButton
          fontLabel="Arial"
          fontFamily="Arial"
          fontOptions={fontOptions}
          setFontOptions={setFontOptions}
        />
        <FontButton
          fontLabel="Comic Sans"
          fontFamily='"Comic Sans MS", "Comic Sans", cursive'
          fontOptions={fontOptions}
          setFontOptions={setFontOptions}
        />
      </div>
      <div css={fontOptionsInnerContainerStyle}>
        {/*<bu tton*/}
        {/*  css={{ ...colorPickerButtonStyle, backgroundColor: fontOptions.fill }}*/}
        {/*/>*/}
        {/*<button*/}
        {/*  css={{*/}
        {/*    ...colorPickerButtonStyle,*/}
        {/*    backgroundColor: fontOptions.stroke,*/}
        {/*  }}*/}
        {/*/>*/}
        <ColorPickerButton
          selectedColor={fontOptions.fill}
          setSelectedColor={(color) => setFontOption("fill", color)}
        />
        <ColorPickerButton
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
