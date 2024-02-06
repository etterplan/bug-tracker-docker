"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status, id }: { status: Status; id: number }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const getKeyByLabel = (label: string): Status | undefined =>
    (Object.keys(statusMap) as Status[]).find(
      (key) => statusMap[key].label === label
    );

  const changeStatus = async (value: string) => {
    try {
      await axios.patch("/api/issues/" + id, { status: getKeyByLabel(value) });
      router.refresh();
    } catch (error) {}
  };

  return (
    <Select.Root
      size="1"
      defaultValue={statusMap[status].label}
      onValueChange={changeStatus}
      disabled={!session}
    >
      <Select.Trigger color={statusMap[status].color} variant="soft" />
      <Select.Content>
        <Select.Item value="Open">Open</Select.Item>
        <Select.Item value="In Progress">In Progress</Select.Item>
        <Select.Item value="Closed">Closed</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusBadge;
