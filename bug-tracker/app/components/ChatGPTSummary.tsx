"use client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "./Skeleton";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
  todo: number;
}

const fetchData = (tasks: Record<string, number>) => {
  return fetch("/api/generateSummary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tasks }),
  })
    .then((res) => res.json())
    .then((data) => data.content)
    .catch((error) => {
      console.error("Error fetching GPT response:", error);
      return "";
    });
};

const ChatGPTSummary = ({ open, inProgress, closed, todo }: Props) => {
  const tasks = {
    todo: todo,
    inProgress: inProgress,
    open: open,
    closed: closed,
  };
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const prevTasks = useRef<Props>({
    open: 0,
    inProgress: 0,
    closed: 0,
    todo: 0,
  });

  useEffect(() => {
    // Check if current task data is different from previous task data
    if (
      tasks.open === prevTasks.current.open &&
      tasks.inProgress === prevTasks.current.inProgress &&
      tasks.closed === prevTasks.current.closed &&
      tasks.todo === prevTasks.current.todo
    ) {
      // Tasks data has not changed, skip API call
      return;
    }

    setIsLoading(true);
    fetchData(tasks)
      .then((data) => {
        setSummary(data);
      })
      .catch((error) => {
        console.error("Error fetching GPT response:", error);
        setSummary("");
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Update the previous task data
    prevTasks.current = tasks;
  }, [tasks]);

  if (isLoading) return <Skeleton height={"2rem"} />;
  return (
    <Flex>
      <Card>
        <Text as="div" size="4">
          {summary}
        </Text>
      </Card>
    </Flex>
  );
};

export default ChatGPTSummary;
