import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { createEmptyTextNode, onDragEnd } from "../helpers";
import TextOptionsSelector from "./TextOptionsSelector";
import DragHandle from "./DragHandle";

function onChangeSetTextNodes(setTextNodes, textNodes, value, index) {
  const newTextNodes = [...textNodes];

  newTextNodes[index].text = value;

  setTextNodes(newTextNodes);
}

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
                        <DragHandle />
                        <div
                          css={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <input
                            css={{ flexGrow: 1, padding: 5, fontSize: 14 }}
                            type="text"
                            value={textNode?.text}
                            onChange={(event) =>
                              onChangeSetTextNodes(
                                setTextNodes,
                                textNodes,
                                event.target.value,
                                index
                              )
                            }
                          />
                          <TextOptionsSelector
                            index={index}
                            textNodes={textNodes}
                            setTextNodes={setTextNodes}
                          />
                        </div>
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
          setTextNodes([...textNodes, { ...createEmptyTextNode() }])
        }
      >
        + Add Text
      </button>
    </>
  );
}
