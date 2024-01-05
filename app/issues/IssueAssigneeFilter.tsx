"use client"
import React from 'react'
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";
import { Skeleton } from "@/app/components";
import { useRouter, useSearchParams } from "next/navigation";

const IssueAssigneeFilter = () => {
  const { data: users, error, isLoading } = useUser();
  if (isLoading) return <Skeleton height={"2rem"} />;
  if (error) return null;
  console.log(users)

  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 10000,
    retry: 3,
  });

export default IssueAssigneeFilter