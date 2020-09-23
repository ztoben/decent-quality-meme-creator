import React from "react";

const fonts = [
  { fontLabel: "Impact", fontFamily: "Impact" },
  { fontLabel: "Arial", fontFamily: "Arial" },
  {
    fontLabel: "Comic Sans",
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
  },
  { fontLabel: "Montserrat", fontFamily: "Montserrat" },
  { fontLabel: "Dancing Script", fontFamily: "Dancing Script" },
];

function handleChange(e, setFontOptions, fontOptions) {
  setFontOptions({ ...fontOptions, fontFamily: e.target.value });
}

export default function FontSelect({ fontOptions, setFontOptions }) {
  return (
    <>
      <select
        css={{
          height: 25,
          borderRadius: 0,
          fontFamily: fontOptions.fontFamily,
        }}
        value={fontOptions.fontFamily}
        onChange={(e) => handleChange(e, setFontOptions, fontOptions)}
      >
        {fonts.map(({ fontFamily, fontLabel }) => (
          <option css={{ fontFamily }} value={fontFamily}>
            {fontLabel}
          </option>
        ))}
      </select>
    </>
  );
}
