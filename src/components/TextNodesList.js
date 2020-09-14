import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { createEmptyTextNode, onDragEnd } from "../helpers";
import TextArea from "./TextArea";

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  display: "flex",
  flexDirection: "row",
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,
  backgroundColor: "lightgray",
  ...(isDragging && {
    border: "1px solid green",
  }),
  ...draggableStyle,
});

export default function TextNodesList({ textNodes, setTextNodes }) {
  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, textNodes, setTextNodes)}
      >
        <Droppable droppableId="droppable-image-text-nodes">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {textNodes.map((textNode, index) => (
                <Draggable
                  key={textNode.id}
                  draggableId={textNode.id}
                  index={index}
                >
                  {(provided, snapshot) => {
                    return (
                      <div>
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          css={getItemStyle(
                            provided.draggableProps.style,
                            snapshot.isDragging
                          )}
                        >
                          <TextArea
                            textNode={textNode}
                            setTextNodes={setTextNodes}
                            textNodes={textNodes}
                            index={index}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        type="button"
        onClick={() =>
          setTextNodes([...textNodes, { ...createEmptyTextNode() }])
        }
      >
        + Add Text
      </button>
    </>
  );
}
