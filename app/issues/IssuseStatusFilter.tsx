"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssuseStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || ""
  );

  useEffect(() => {
    setSelectedStatus(searchParams.get("status") || "");
  }, [searchParams]);

  const onValueChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    if (params.get("status") !== selectedStatus) {
      params.set("page", "1");
    }
    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root value={selectedStatus} onValueChange={onValueChange}>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item value={status.value || "ALL"} key={status.label}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssuseStatusFilter;
