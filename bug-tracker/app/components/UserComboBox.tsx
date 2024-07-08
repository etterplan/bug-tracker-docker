'use client'
import './UserComboBox.css';
import { useState, useMemo, startTransition, FC, useEffect, useCallback } from 'react';
import { Flex } from '@radix-ui/themes';
import { Combobox, ComboboxItem, ComboboxList, ComboboxProvider } from "@ariakit/react";
import * as RadixSelect from "@radix-ui/react-select";
import { matchSorter } from 'match-sorter'
import { MagnifyingGlassIcon, ChevronDownIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { User } from "@prisma/client";

interface UserComboBoxProps {
  onValueChange: (value: string) => void;
  userAdded: boolean;
  setUserAdded: (value: boolean) => void;
  users: User[];
}

const UserComboBox: FC<UserComboBoxProps> = ({ onValueChange, userAdded, setUserAdded, users}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const clearSelection = useCallback(() => {
    setValue('');
    setSearchValue('');
    setOpen(false);
    onValueChange('')
  }, [setValue, setSearchValue, setOpen, onValueChange]);

  useEffect(() => {
    if (userAdded) {
      clearSelection();
      setUserAdded(false);
    }
  }, [userAdded, setUserAdded, clearSelection])

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
    <div>
    <RadixSelect.Root
      value={value}
      onValueChange={(value) => {
        setValue(value);
        onValueChange && onValueChange(value);
      }}
      open={open}
      onOpenChange={setOpen}
      disabled={!users || users.length === 0}
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
        <Flex className='select-container'>
          <RadixSelect.Trigger aria-label="User" className="select" >
            <RadixSelect.Value placeholder="Select a User" />
            <RadixSelect.Icon className="select-icon">
              <ChevronDownIcon />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          <Flex className='clear-selection-btn' onClick={(event) => {
            event.stopPropagation();
            clearSelection();
          }}>
            <Cross1Icon />
          </Flex>
        </Flex>
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
    </div>
  );
}

export default UserComboBox