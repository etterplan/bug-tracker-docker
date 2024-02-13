"use client";
import { ProjectStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const projectStatusMap: Record<
  ProjectStatus,
  {
    label: string;
    color:
      | "ruby"
      | "tomato"
      | "red"
      | "crimson"
      | "pink"
      | "plum"
      | "purple"
      | "violet"
      | "iris"
      | "indigo"
      | "blue"
      | "cyan"
      | "teal"
      | "jade"
      | "green"
      | "grass"
      | "brown"
      | "orange"
      | "sky"
      | "mint"
      | "lime"
      | "yellow"
      | "amber"
      | "gold"
      | "bronze"
      | "gray";
  }
> = {
  ON_TRACK: { label: "On Track", color: "grass" },
  OFF_TRACK: { label: "Off Track", color: "red" },
  AT_RISK: { label: "At Risk", color: "yellow" },
  ON_HOLD: { label: "On Hold", color: "blue" },
  COMPLETE: { label: "Complete", color: "green" },
  NEW: {
    label: "New",
    color: "gray",
  },
};

const ProjectStatusBadge = ({
  status,
  id,
}: {
  status: ProjectStatus;
  id: number;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const getKeyByLabel = (label: string): ProjectStatus | undefined =>
    (Object.keys(projectStatusMap) as ProjectStatus[]).find(
      (key) => projectStatusMap[key].label === label
    );

  const changeStatus = async (value: string) => {
    try {
      await axios.patch("/api/projects/" + id, {
        status: getKeyByLabel(value),
      });
      router.refresh();
    } catch (error) {}
  };
  return (
    <Select.Root
      size="1"
      value={projectStatusMap[status].label}
      onValueChange={changeStatus}
      disabled={!session}
    >
      <Select.Trigger color={projectStatusMap[status].color} variant="soft" />
      <Select.Content>
        <Select.Item value="New">New</Select.Item>
        <Select.Item value="On Track">On track</Select.Item>
        <Select.Item value="Off Track">Off track</Select.Item>
        <Select.Item value="On Hold">On hold</Select.Item>
        <Select.Item value="At Risk">At risk</Select.Item>
        <Select.Item value="Complete">Complete</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default ProjectStatusBadge;
