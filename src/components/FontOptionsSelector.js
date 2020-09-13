import React from "react";
import IconButton from "./IconButton";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaFill,
  FaMinus,
  FaPlus,
  FaBorderStyle,
} from "react-icons/fa";

const fontOptionsContainerStyle = {
  display: "flex",
  flex: 1,
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

// fontFamily: "Impact", "Arial", "Comic Sans"
// fontSize: 40,
// fill: "white",
// stroke: "black",
// strokeWidth: 1,
// align: 'center'

const FontButton = ({ fontFamily, setFontOptions, fontOptions }) => {
  return (
    <IconButton
      onClick={() => setFontOptions({ ...fontOptions, fontFamily })}
      selected={fontOptions.fontFamily === fontFamily}
    >
      {fontFamily}
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
          fontFamily="Impact"
          fontOptions={fontOptions}
          setFontOptions={setFontOptions}
        />
        <FontButton
          fontFamily="Arial"
          fontOptions={fontOptions}
          setFontOptions={setFontOptions}
        />
        <FontButton
          fontFamily="Comic Sans"
          fontOptions={fontOptions}
          setFontOptions={setFontOptions}
        />
      </div>
      <div css={fontOptionsInnerContainerStyle}>
        <IconButton>
          <FaFill />
        </IconButton>
        <IconButton>
          <FaBorderStyle />
        </IconButton>
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
