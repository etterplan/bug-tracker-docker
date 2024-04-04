'use client'
import { useState, useMemo, startTransition } from 'react';
import {  Flex, Button } from '@radix-ui/themes';
import { Combobox, ComboboxItem, ComboboxList, ComboboxProvider } from "@ariakit/react";
import * as RadixSelect from "@radix-ui/react-select";
import { matchSorter } from 'match-sorter'
import { MagnifyingGlassIcon, ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import useUser from '../../components/useUser';

const AddUser = () => {
  const { data: users, error, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const matches = useMemo(() => {
    if (!users) return [];
    if (!searchValue) return users;
    const keys = ["name", "id"];
    const matches = matchSorter(users, searchValue, { keys });
    const selectedUser = users.find((user) => user.id === value);
    if (selectedUser && !matches.includes(selectedUser)) {
      matches.push(selectedUser);
    }
    return matches;
  }, [searchValue, value, users]);

  return (
    <RadixSelect.Root
      value={value}
      onValueChange={setValue}
      open={open}
      onOpenChange={setOpen}
    >
      <ComboboxProvider
        open={open}
        setOpen={setOpen}
        resetValueOnHide
        includesBaseElement={false}
        setValue={(value) => {
          startTransition(() => {
            setSearchValue(value);
          });
        }}
      >
        <RadixSelect.Trigger aria-label="User" className="select" >
          <RadixSelect.Value placeholder="Select a User" />
          <RadixSelect.Icon className="select-icon">
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Content
          role="dialog"
          aria-label="Users"
          position="popper"
          className="popover"
          sideOffset={4}
          alignOffset={-16}
        >
          <Flex className="combobox-wrapper">
            <Flex className="combobox-icon">
              <MagnifyingGlassIcon />
            </Flex>
            <Combobox
              autoSelect
              placeholder="Search Users"
              className="combobox"
              onBlurCapture={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            />
          </Flex>
          <ComboboxList className="listbox">
            {matches.map(({ name, id }) => (
              <RadixSelect.Item
                key={id}
                value={id}
                asChild
                className="item"
              >
                <ComboboxItem>
                  <RadixSelect.ItemText>{name}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="item-indicator">
                    <CheckIcon />
                  </RadixSelect.ItemIndicator>
                </ComboboxItem>
              </RadixSelect.Item>
            ))}
          </ComboboxList>
        </RadixSelect.Content>
      </ComboboxProvider>
    </RadixSelect.Root>
  );
}

export default AddUser