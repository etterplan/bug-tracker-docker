"use client";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Issue, Status } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import IssueCard from "./IssueCard";

interface Props {
  issueList: Record<Status, Issue[]>;
}
const ShowBoard = ({ issueList }: Props) => {
  const [issues, setIssuesData] = useState(issueList);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Reorder issues within the same column
    if (source.droppableId === destination.droppableId) {
      const status = source.droppableId;
      const updatedIssues = [...issues[status]];
      const [removed] = updatedIssues.splice(source.index, 1);
      updatedIssues.splice(destination.index, 0, removed);

      // Update positions in the database
      await axios.patch(`/api/issues/${draggableId}`, {
        status,
        position: destination.index,
      });

      setIssuesData({ ...issues, [status]: updatedIssues });
    } else {
      // Move issue to a different column
      const sourceStatus = source.droppableId;
      const destinationStatus = destination.droppableId;
      const updatedSourceIssues = [...issues[sourceStatus]];
      const updatedDestinationIssues = [...issues[destinationStatus]];
      const [removed] = updatedSourceIssues.splice(source.index, 1);
      updatedDestinationIssues.splice(destination.index, 0, removed);

      // Update positions in the database

      axios.patch(`/api/issues/${draggableId}`, {
        status: destinationStatus,
        position: destination.index,
      });

      setIssuesData({
        ...issues,
        [sourceStatus]: updatedSourceIssues,
        [destinationStatus]: updatedDestinationIssues,
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(issues).map(([status, issues]) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Text>{status}</Text>
                {issues.map((issue, index) => (
                  <Draggable
                    key={issue.id}
                    draggableId={issue.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <IssueCard issue={issue} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <Toaster />
    </>
  );
};

export default ShowBoard;
