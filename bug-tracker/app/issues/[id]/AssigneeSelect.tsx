"use client";
import { Skeleton } from "@/app/components";
import { Issue } from "@prisma/client";
import useUser from "@/app/components/useUser";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <Skeleton height={"2rem"} />;
  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      const updatedIssue = {
        assignedToUserId: userId === "unassigned" ? null : userId,
        status:
          userId === "unassigned"
            ? "OPEN"
            : userId
              ? "IN_PROGRESS"
              : issue.status,
      };

      await axios.patch(`/api/issues/${issue.id}`, updatedIssue);

      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
