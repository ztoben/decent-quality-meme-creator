import React from "react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaLink,
  FaTrashAlt,
} from "react-icons/fa";

const boldOption = ["fontStyle", "bold"];
const italicOption = ["fontStyle", "italic"];
const strikethroughOption = ["textDecoration", "line-through"];
const underlineOption = ["textDecoration", "underline"];

const containerStyle = {
  display: "flex",
  border: "1px solid lightgray",
  borderTop: "none",
  backgroundColor: "white",
  flex: 1,
  justifyContent: "space-between",
  "& > div": {
    display: "inline-flex",
  },
};
const buttonStyle = {
  display: "flex",
  padding: 5,
  justifyContent: "center",
  margin: 2,
  borderRadius: 0,
  boxShadow: "none",
  cursor: "pointer",
};

const IconButton = ({ children, onClick, selected }) => (
  <button
    css={{
      ...buttonStyle,
      ...(selected && {
        backgroundColor: "gray",
      }),
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function TextOptionsSelector({
  index,
  textNodes,
  setTextNodes,
}) {
  const toggleTextOption = (option, value) => {
    const newTextNodes = [...textNodes];
    const options = newTextNodes[index][option].split(" ");

    if (options.includes(value)) {
      const index = options.indexOf(value);
      if (index > -1) {
        options.splice(index, 1);
      }
    } else {
      options.push(value);
    }

    newTextNodes[index][option] = options.join(" ");
    setTextNodes(newTextNodes);
  };
  const isSelected = (option, value) => {
    const textNode = textNodes[index];

    return textNode[option].includes(value);
  };

  return (
    <div css={containerStyle}>
      <IconButton>
        <FaLink />
      </IconButton>
      <div>
        <IconButton
          onClick={() => toggleTextOption(...boldOption)}
          selected={isSelected(...boldOption)}
        >
          <FaBold />
        </IconButton>
        <IconButton
          onClick={() => toggleTextOption(...italicOption)}
          selected={isSelected(...italicOption)}
        >
          <FaItalic />
        </IconButton>
        <IconButton
          onClick={() => toggleTextOption(...strikethroughOption)}
          selected={isSelected(...strikethroughOption)}
        >
          <FaStrikethrough />
        </IconButton>
        <IconButton
          onClick={() => toggleTextOption(...underlineOption)}
          selected={isSelected(...underlineOption)}
        >
          <FaUnderline />
        </IconButton>
        <IconButton
          onClick={() => {
            const newTextNodes = [...textNodes];
            newTextNodes.splice(index, 1);

            setTextNodes(newTextNodes);
          }}
        >
          <FaTrashAlt />
        </IconButton>
      </div>
    </div>
  );
}
