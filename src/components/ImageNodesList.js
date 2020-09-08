import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { onDragEnd } from "../helpers";

const imageNodeInfoContainerStyle = {
  display: "flex",
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

const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: "none",
  backgroundColor: "lightgray",
  ...(isDragging && {
    border: "1px solid green",
  }),
  ...draggableStyle,
  ...imageNodeInfoContainerStyle,
});

export default function ImageNodesList({ imageNodes, setImageNodes }) {
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, imageNodes, setImageNodes)}
    >
      <Droppable droppableId="droppable-image-nodes">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {imageNodes.map((imageNode, index) => (
              <Draggable
                key={imageNode.id}
                draggableId={imageNode.id}
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
                      <p css={imageNodeTextStyle}>{imageNode.name}</p>
                      <button
                        type="button"
                        onClick={() => {
                          const newImageNodes = [...imageNodes];
                          newImageNodes.splice(index, 1);

                          setImageNodes(newImageNodes);
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
  );
}
