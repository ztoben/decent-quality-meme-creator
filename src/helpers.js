import { triggerBase64Download } from "react-base64-downloader";

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

export const getInitialTextNodes = () => [
  { ...createEmptyTextNode(), text: "Your text goes here" },
];

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
