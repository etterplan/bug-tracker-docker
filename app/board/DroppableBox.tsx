"use client";
import { ReactNode } from "react";
import { Box } from "@radix-ui/themes";

type DroppableBoxProps = {
  onDropIssue: (issueId: string, status: string) => void;
  status: string;
  children: ReactNode;
};

const DroppableBox: React.FC<DroppableBoxProps> = ({ onDropIssue, status, children }) => {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const issueId = e.dataTransfer.getData("text/plain");
    onDropIssue(issueId, status);
  };

  return (
    <Box onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </Box>
  );
};

export default DroppableBox