"use client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
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
    Todo: todo,
    InProgress: inProgress,
    Open: open,
    Closed: closed,
  };
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData(tasks).then((data) => {
      setSummary(data);
      setIsLoading(false);
    });
  }, [tasks]);
  if (isLoading) return <Skeleton height={"2rem"} />;
  return (
    <Flex>
      <Card>
        <Text as="div" color="gray" size="2">
          {summary}
        </Text>
      </Card>
    </Flex>
  );
};

export default ChatGPTSummary;
