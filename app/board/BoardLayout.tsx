"use client";
import { Issue as PrismaIssue, User } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import IssueCard from "./IssueCard";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useState } from "react";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Issue = PrismaIssue & {
  assignedToUser: User | null;
};
type BoardLayoutProps = {
  openIssues: Issue[];
  inProgressIssues: Issue[];
  closedIssues: Issue[];
};
type IssueList = {
  openIssues: Issue[];
  inProgressIssues: Issue[];
  closedIssues: Issue[];
};
type Issues = {
  [K in keyof IssueList]?: Issue[];
};

const BoardLayout: React.FC<BoardLayoutProps> = ({ openIssues, inProgressIssues, closedIssues }) => {
  const router = useRouter();
  const [issues, setIssues] = useState<Issues>({ openIssues, inProgressIssues, closedIssues });
  console.log(issues)

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) { //returns function if user dropped item outside of droppable
      return;
    }

    if (  //returns function if item didn't move from original position
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = issues[source.droppableId as keyof Issues];
    const finish = issues[destination.droppableId as keyof Issues];

    //MOVING ISSUE WITHIN ONE COLUMN
    if (start === finish) {
      let newIssueIds: Issue[] = [];
      if (start) {
        newIssueIds = Array.from(start);
      }
      //removing issue from original position & inserting issue into new position
      const [removed] = newIssueIds.splice(source.index, 1);
      newIssueIds.splice(destination.index, 0, removed);
      //creating new column with updated issueIds
      const newColumn = {
        ...start,
        issueIds: newIssueIds,
      };
      //updating state with the new column
      setIssues({
        ...issues,
        [source.droppableId]: newColumn,
      });

      return;
    }
    //MOVING ISSUE BETWEEN COLUMNS
    let startIssueIds: Issue[] = [];
    if (start) {
      startIssueIds = Array.from(start);
    }
    //removing issue from start column
    const [removed] = startIssueIds.splice(source.index, 1);
    const newStart = {
      ...start,
      issueIds: startIssueIds,
    };
    //creates a copy of finish array
    let finishIssueIds: Issue[] = [];
    if (finish) {
      finishIssueIds = Array.from(finish);
    }
    //inserting issue into finish column
    finishIssueIds.splice(destination.index, 0, removed);
    const newFinish = {
      ...finish,
      issueIds: finishIssueIds,
    };
    //updating state with new start and finish colum
    setIssues({
      ...issues,
      [source.droppableId as keyof Issues]: newStart,
      [destination.droppableId as keyof Issues]: newFinish,
    });

    try {
      const draggableId = result.draggableId;
      const destinationId = result.destination?.droppableId;

      // Define the valid statuses
      const statusMapping: { [key: string]: string } = {
        openIssues: "OPEN",
        inProgressIssues: "IN_PROGRESS",
        closedIssues: "CLOSED"
      };

      // Check if the destinationId is a valid status
      if (destinationId && statusMapping[destinationId]) {
        // Prepare the data to be sent to the server
        const checkedStatus = {
          status: statusMapping[destinationId]
        };

        // Make the API call to update the issue status in the database
        await axios.patch(`/api/issues/${draggableId}`, checkedStatus);

        // Refresh the page to reflect the changes
        router.refresh();
      }
    } catch (error) {
      toast.error("Changes could not be saved.");
    }

  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="openIssues">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Text>OPEN</Text>
              {openIssues.map((issue, index) => (
                <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <IssueCard issue={issue} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="inProgressIssues">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Text>IN PROGRESS</Text>
              {inProgressIssues.map((issue, index) => (
                <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <IssueCard issue={issue} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="closedIssues">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Text>CLOSED</Text>
              {closedIssues.map((issue, index) => (
                <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <IssueCard issue={issue} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Toaster />
    </>
  )
}

export default BoardLayout