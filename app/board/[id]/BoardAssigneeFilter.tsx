"use client"
import React, { useState, useEffect } from 'react'
import { Select } from '@radix-ui/themes';
import useUser from '@/app/components/useUser';
import { Skeleton } from '@/app/components';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const BoardAssigneeFilter = () => {
  const { data: users, error, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname()
  
  console.log(pathName)
  const [selectedUser, setSelectedUser] = useState(
    searchParams.get("userId") || ""
  );

  useEffect(() => {
    setSelectedUser(searchParams.get("userId") || "");
  }, [searchParams]);

  if (isLoading) return <Skeleton height={"2rem"} />;
  if (error) return null;


  const handleValueChange = (userId: string) => {

    setSelectedUser(userId)
    const params = new URLSearchParams(searchParams);
    params.delete("userId");
    if (userId && userId !== "none") params.append("userId", userId);
    const query = params.size ? "?" + params.toString() : "";
    router.push(`${pathName}${query}`);
  }
  return (
    <Select.Root
      value={selectedUser}
      onValueChange={handleValueChange}>
      <Select.Trigger placeholder="Filter by Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Item value="none">Filter by Assignee</Select.Item>
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

export default BoardAssigneeFilter