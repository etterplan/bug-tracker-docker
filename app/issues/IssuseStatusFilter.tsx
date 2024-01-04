"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssuseStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "");

  useEffect(() => {
    setSelectedStatus(searchParams.get("status") || "");
  }, [searchParams]);

  return (
    <Select.Root
      value={selectedStatus}
      onValueChange={(status) => {
        setSelectedStatus(status);
        const parms = new URLSearchParams(searchParams);
        parms.delete('status');
        if (status) parms.append("status", status);
        if (searchParams.get("orderBy"))
          parms.append("orderBy", searchParams.get("orderBy")!);
        const query = parms.size ? "?" + parms.toString() : "";
        router.push(`/issues${query}`);
      }}
    >
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
