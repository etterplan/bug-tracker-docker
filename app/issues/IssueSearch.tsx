"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon} from "@radix-ui/react-icons";

const IssueSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    if (searchText && searchText !== '') params.append('search', searchText);
    const query = params.toString() ? '?' + params.toString() : '';
    router.push(`/issues${query}`);
  }, [searchText]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TextField.Root>
      <TextField.Slot>
      <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search issues..."
      />
    </TextField.Root>
  );
};

export default IssueSearch;