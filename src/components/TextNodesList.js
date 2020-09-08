import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { createEmptyTextNode, onDragEnd } from "../helpers";

function onChangeSetImageTextNodes(
  setImageTextNodes,
  imageTextNodes,
  value,
  index
) {
  const newImageTextNodes = [...imageTextNodes];

  newImageTextNodes[index].text = value;

  setImageTextNodes(newImageTextNodes);
}

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  display: "flex",
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,
  backgroundColor: "lightgray",
  ...(isDragging && {
    border: "1px solid green",
  }),
  ...draggableStyle,
});

export default function TextNodesList({ imageTextNodes, setImageTextNodes }) {
  return (
    <>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, imageTextNodes, setImageTextNodes)
        }
      >
        <Droppable droppableId="droppable-image-text-nodes">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {imageTextNodes.map((imageTextNode, index) => (
                <Draggable
                  key={imageTextNode.id}
                  draggableId={imageTextNode.id}
                  index={index}
                >
                  {(provided, snapshot) => (
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
                        <div
                          css={{
                            width: 40,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span>≡</span>
                        </div>
                        <input
                          css={{ flexGrow: 1, padding: 5 }}
                          type="text"
                          value={imageTextNode?.text}
                          onChange={(event) =>
                            onChangeSetImageTextNodes(
                              setImageTextNodes,
                              imageTextNodes,
                              event.target.value,
                              index
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newTextNodes = [...imageTextNodes];
                            newTextNodes.splice(index, 1);

                            setImageTextNodes(newTextNodes);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
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
          setImageTextNodes([...imageTextNodes, { ...createEmptyTextNode() }])
        }
      >
        + Add Text
      </button>
    </>
  );
}
