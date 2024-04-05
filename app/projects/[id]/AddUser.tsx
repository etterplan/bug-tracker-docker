'use client'
import UserComboBox from "@/app/components/UserComboBox"
import { useState } from 'react';

const AddUser = () => {
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <h1>Select a User</h1>
      <UserComboBox onValueChange={handleUserChange} />
      {selectedUserId && <p>Selected User ID: {selectedUserId}</p>}
    </div>
  )
}

export default AddUser