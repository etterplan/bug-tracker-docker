"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssuseStatusFilter = () => {
  const router = useRouter();
  const searchParms = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParms.get("status") || ""}
      onValueChange={(status) => {
        const parms = new URLSearchParams(searchParms);
        parms.delete('status');
        if (status) parms.append("status", status);
        if (searchParms.get("orderBy"))
          parms.append("orderBy", searchParms.get("orderBy")!);
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
