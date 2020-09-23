import React from "react";
import {
  ColorWrap,
  Saturation,
  Hue,
  Alpha,
  Checkboard,
} from "react-color/lib/components/common";
import SketchFields from "react-color/lib/components/sketch/SketchFields";
import SketchPresetColors from "react-color/lib/components/sketch/SketchPresetColors";
import { FaTimes } from "@meronex/icons/fa";

export const CustomSketchPicker = ({
  width,
  rgb,
  hex,
  hsv,
  hsl,
  onChange,
  onSwatchHover,
  disableAlpha,
  presetColors,
  renderers,
  styles: passedStyles = {},
  className = "",
  onClose,
}) => {
  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 5,
    },
    picker: {
      width,
      padding: "10px 10px 0",
      boxSizing: "initial",
      background: "#fff",
      borderRadius: "4px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)",
    },
    saturation: {
      width: "100%",
      paddingBottom: "75%",
      position: "relative",
      overflow: "hidden",
    },
    Saturation: {
      radius: "3px",
      shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
    },
    controls: {
      display: "flex",
    },
    sliders: {
      padding: "4px 0",
      flex: "1",
    },
    color: {
      width: "24px",
      height: "24px",
      position: "relative",
      marginTop: "4px",
      marginLeft: "4px",
      borderRadius: "3px",
    },
    activeColor: {
      absolute: "0px 0px 0px 0px",
      borderRadius: "2px",
      background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
      boxShadow:
        "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
    },
    hue: {
      position: "relative",
      height: "10px",
      overflow: "hidden",
    },
    Hue: {
      radius: "2px",
      shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
    },
    alpha: {
      position: "relative",
      height: "10px",
      marginTop: "4px",
      overflow: "hidden",
    },
    Alpha: {
      radius: "2px",
      shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)",
    },
    ...passedStyles,
    ...(disableAlpha && {
      disableAlpha: {
        color: {
          height: "10px",
        },
        hue: {
          height: "10px",
        },
        alpha: {
          display: "none",
        },
      },
    }),
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.keyCode === 27) onClose();
      }}
      css={styles.picker}
      className={`sketch-picker ${className}`}
    >
      <div css={styles.header}>
        <span>Color Picker</span>
        <FaTimes onClick={onClose} />
      </div>
      <div css={styles.saturation}>
        <Saturation
          css={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
      <div css={styles.controls} className="flexbox-fix">
        <div css={styles.sliders}>
          <div css={styles.hue}>
            <Hue css={styles.Hue} hsl={hsl} onChange={onChange} />
          </div>
          <div css={styles.alpha}>
            <Alpha
              css={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={onChange}
            />
          </div>
        </div>
        <div css={styles.color}>
          <Checkboard />
          <div css={styles.activeColor} />
        </div>
      </div>

      <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={onChange}
        disableAlpha={disableAlpha}
      />
      <SketchPresetColors
        colors={presetColors}
        onClick={onChange}
        onSwatchHover={onSwatchHover}
      />
    </div>
  );
};

CustomSketchPicker.defaultProps = {
  disableAlpha: false,
  width: 200,
  styles: {},
  presetColors: [
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#000000",
    "#4A4A4A",
    "#9B9B9B",
    "#FFFFFF",
  ],
};

export default ColorWrap(CustomSketchPicker);
