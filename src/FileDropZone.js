import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  textAlign: "center",
  cursor: "pointer",
};
const activeStyle = {
  borderColor: "#2196f3",
};
const acceptStyle = {
  borderColor: "#00e676",
};
const rejectStyle = {
  borderColor: "#ff1744",
};
const imageNodeInfoContainerStyle = {
  display: "inline-flex",
  marginTop: 10,
};
const imageNodeTextStyle = {
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "solid",
  backgroundColor: "#fafafa",
  color: "green",
  padding: 5,
  margin: 0,
  flex: 1,
};

export default function FileDropZone({ imageNodes, setImageNodes }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImageNodes = [];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          console.log(file);

          newImageNodes.push({
            name: file.name,
            content: reader.result,
          });
        };
        reader.onloadend = () => {
          setImageNodes([...imageNodes, ...newImageNodes]);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [imageNodes, setImageNodes]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {imageNodes.map((imageNode, index) => (
        <div
          key={`${imageNode.name}-${index}`}
          css={imageNodeInfoContainerStyle}
        >
          <p css={imageNodeTextStyle}>{imageNode.name}</p>
          <button
            onClick={() => {
              const newImageNodes = [...imageNodes];
              newImageNodes.splice(index, 1);

              setImageNodes(newImageNodes);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
