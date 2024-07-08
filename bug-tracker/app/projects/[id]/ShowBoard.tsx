"use client";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Issue as PrismaIssue, Status, User } from "@prisma/client";
import { Text, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import IssueCard from "./IssueCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Issue = PrismaIssue & {
  assignedToUser: User | null;
};

interface Props {
  issueList: Record<Status, Issue[]>;
}
const ShowBoard = ({ issueList }: Props) => {
  const router = useRouter();
  const [issues, setIssuesData] = useState(issueList);
  useEffect(() => {
    setIssuesData(issueList);
  }, [issueList]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const epsilon = 0.001;

    // Reorder issues within the same column
    if (source.droppableId === destination.droppableId) {
      const status = source.droppableId;
      const updatedIssues = [...issues[status as Status]];
      const [removed] = updatedIssues.splice(source.index, 1);
      updatedIssues.splice(destination.index, 0, removed);

      if (updatedIssues.length === 0) {
        return;
      }

      let newPosition: number;
      if (destination.index === 0) {
        // Moved to the beginning of the list
        newPosition = updatedIssues[1]?.position
          ? updatedIssues[1].position - 0.1
          : epsilon;
      } else if (destination.index === updatedIssues.length - 1) {
        // Moved to the end of the list
        newPosition =
          updatedIssues.length > 1 &&
            updatedIssues[updatedIssues.length - 2]?.position !== null
            ? updatedIssues[updatedIssues.length - 2].position! + 0.1
            : 0.999991;
      } else {
        // Moved somewhere in the middle of the list
        const prevPosition = updatedIssues[destination.index - 1]?.position;
        const nextPosition = updatedIssues[destination.index + 1]?.position;
        newPosition =
          prevPosition !== null && nextPosition !== null
            ? (prevPosition + nextPosition) / 2
            : 0.1;
      }

      if (newPosition <= 0) {
        newPosition = epsilon;
      }
      //check if newPosition already exists in the position values of the other issues
      if (
        updatedIssues.some(
          (issue) =>
            issue.position === newPosition && issue.id !== Number(draggableId)
        )
      ) {
        console.log(
          "Duplicate position found:",
          newPosition,
          " In: ",
          updatedIssues
        );
        console.log("Id of draggable:", draggableId);
        toast.error("Changes could not be saved.");
        return;
      }

      console.log("New position:", newPosition);

      try {
        // Update positions in the database
        setIssuesData({ ...issues, [status]: updatedIssues });
        const updatePostion = await axios.patch(`/api/issues/${draggableId}`, {
          position: newPosition,
        });
        router.refresh();
      } catch (error) {
        toast.error("Changes could not be saved.");
        router.refresh();
        console.log(error);
      }
    } else {
      // Move issue to a different column
      const sourceStatus = source.droppableId;
      const destinationStatus = destination.droppableId;
      const updatedSourceIssues = [...issues[sourceStatus as Status]];
      const updatedDestinationIssues = [...issues[destinationStatus as Status]];
      const [removed] = updatedSourceIssues.splice(source.index, 1);
      updatedDestinationIssues.splice(destination.index, 0, removed);

      if (updatedDestinationIssues.length === 0) {
        return;
      }
      let newPosition: number;
      if (updatedDestinationIssues.length > 1) {
        if (destination.index === 0) {
          // Moved to the beginning of the list
          newPosition =
            updatedDestinationIssues[1]?.position !== null
              ? updatedDestinationIssues[1].position - 0.1
              : 0.1;
        } else if (destination.index === updatedDestinationIssues.length - 1) {
          // Moved to the end of the list
          newPosition =
            updatedDestinationIssues[updatedDestinationIssues.length - 2]
              ?.position !== null
              ? updatedDestinationIssues[updatedDestinationIssues.length - 2]
                .position! + 0.1
              : 0.999991;
        } else {
          // Moved somewhere in the middle of the list
          const prevPosition =
            updatedDestinationIssues[destination.index - 1]?.position;
          const nextPosition =
            updatedDestinationIssues[destination.index + 1]?.position;
          newPosition =
            prevPosition !== null && nextPosition !== null
              ? (prevPosition + nextPosition) / 2
              : 0.1;
        }
      } else {
        //if updatedDestinationIssues is empty
        newPosition = Math.random() * (0.999999999 - 0.9) + 0.9;
      }

      if (newPosition === 0 || newPosition < 0) {
        newPosition = epsilon;
      }
      //check if newPosition already exists in the position values of the other issues
      if (
        updatedDestinationIssues.some(
          (issue) =>
            issue.position === newPosition && issue.id !== Number(draggableId)
        )
      ) {
        console.log(
          "Duplicate position found:",
          newPosition,
          " In: ",
          updatedDestinationIssues
        );
        console.log("Id of draggable:", draggableId);
        toast.error("Changes could not be saved. Duplicate position value!");
        return;
      }

      console.log("New position:", newPosition);

      try {
        // Update positions in the database
        setIssuesData({
          ...issues,
          [sourceStatus]: updatedSourceIssues,
          [destinationStatus]: updatedDestinationIssues,
        });
        const updatePostion = await axios.patch(`/api/issues/${draggableId}`, {
          status: destinationStatus,
          position: newPosition,
        });
        router.refresh();
      } catch (error) {
        toast.error("Changes could not be saved.");
        router.refresh();
        console.log(error);
      }
    }
  };

  const statusText: Record<Status, string> = {
    TODO: "To Do",
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    CLOSED: "Closed",
  };
  const statusColors: Record<Status, string> = {
    TODO: "bg-gray-300",
    OPEN: "bg-red-300",
    IN_PROGRESS: "bg-violet-300",
    CLOSED: "bg-green-300",
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(issues).map(([status, issues]) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Flex align="center">
                  <Flex className={`${statusColors[status as Status]} rounded-full h-3.5 w-3.5 mr-2`}></Flex>
                  <Text size="2" weight="bold">{statusText[status as Status]} <span className="bg-gray-200 rounded-full px-3">{issues.length}</span></Text>
                </Flex>
                <div className="border-1 my-1 py-1 rounded-md bg-gray-100" style={{ minHeight: "108px" }}>
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
                          <Link href="/issues/[id]" as={`/issues/${issue.id}`}>
                            <IssueCard issue={issue} />
                          </Link>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
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
