"use client";
import { Issue as PrismaIssue, User } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import IssueCard from "./IssueCard";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useState } from "react";

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
  const [issues, setIssues] = useState<Issues>({ openIssues, inProgressIssues, closedIssues });
  console.log(issues)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = issues[source.droppableId as keyof Issues];
    const finish = issues[destination.droppableId as keyof Issues];

    if (start === finish) {
      let newIssueIds: Issue[] = [];
      if (start) {
        newIssueIds = Array.from(start);
      }
      const [removed] = newIssueIds.splice(source.index, 1);
      newIssueIds.splice(destination.index, 0, removed);

      const newColumn = {
        ...start,
        issueIds: newIssueIds,
      };

      setIssues({
        ...issues,
        [source.droppableId]: newColumn,
      });

      return;
    }

    //moving from one list to another
    let startIssueIds: Issue[] = [];
    if (start) {
      startIssueIds = Array.from(start);
    }
    const [removed] = startIssueIds.splice(source.index, 1);
    const newStart = {
      ...start,
      issueIds: startIssueIds,
    };

    let finishIssueIds: Issue[] = [];
    if (finish) {
      finishIssueIds = Array.from(finish);
    }
    finishIssueIds.splice(destination.index, 0, removed);
    const newFinish = {
      ...finish,
      issueIds: finishIssueIds,
    };

    setIssues({
      ...issues,
      [source.droppableId as keyof Issues]: newStart,
      [destination.droppableId as keyof Issues]: newFinish,
    });
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
    </>
  )
}

export default BoardLayout