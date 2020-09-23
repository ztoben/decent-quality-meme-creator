import React from "react";
import { FaTrashAlt } from "@meronex/icons/fa";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { onDragEnd } from "../helpers";
import DragHandle from "./DragHandle";
import IconButton from "./IconButton";

const imageNodeInfoContainerStyle = {
  display: "flex",
  marginTop: 10,
};
const imageNodeTextStyle = {
  fontSize: 14,
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "solid",
  backgroundColor: "#fafafa",
  color: "green",
  padding: 4,
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
                      <DragHandle />
                      <p css={imageNodeTextStyle}>{imageNode.name}</p>
                      <IconButton
                        style={{ margin: 0, width: 29 }}
                        onClick={() => {
                          const newImageNodes = [...imageNodes];
                          newImageNodes.splice(index, 1);

                          setImageNodes(newImageNodes);
                        }}
                      >
                        <FaTrashAlt />
                      </IconButton>
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
