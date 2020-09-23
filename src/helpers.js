import { triggerBase64Download } from "react-base64-downloader";
import { DEFAULT_CANVAS_SIZE } from "./constants";

export function generateID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function createEmptyTextNode() {
  return {
    text: "",
    id: generateID(),
    fontStyle: "normal",
    textDecoration: "",
    draggable: true,
  };
}

export const getInitialTextNodes = () => [{ ...createEmptyTextNode() }];

export const resetCanvas = (
  setTextNodes,
  setImageNodes,
  setWidth,
  setHeight
) => {
  setTextNodes(getInitialTextNodes());
  setImageNodes([]);
  setWidth(DEFAULT_CANVAS_SIZE);
  setHeight(DEFAULT_CANVAS_SIZE);
};

export const handleSaveImage = (canvasRef, downloadName) => {
  const dataURL = canvasRef.current.toDataURL({
    mimeType: "image/png",
  });

  triggerBase64Download(dataURL, downloadName || "decent-quality-meme");
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function onDragEnd(result, items, setItems) {
  if (!result.destination) {
    return;
  }

  const newItems = reorder(
    items,
    result.source.index,
    result.destination.index
  );

  setItems(newItems);
}

export function RGBAToHexA({ r, g, b, a }) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  if (a.length === 1) a = "0" + a;

  return "#" + r + g + b + a;
}

export function getImageDimensions(file) {
  return new Promise(function (resolve) {
    let i = new Image();

    i.onload = function () {
      return resolve({ w: i.width, h: i.height });
    };

    i.src = file;
  });
}
