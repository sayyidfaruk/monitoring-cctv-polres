'use client';
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from '@material-tailwind/react';

function ModalAddUser({ openAddUser, handleOpenAddUser, result }) {
  const [userData, setUserData] = useState({
    username: '',
    nrp: '',
    password: '',
    role: 'User',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleRoleChange = (value) => {
    setUserData({ ...userData, role: value });
  };
  const handleSubmitAddUser = async () => {
    console.log('User ditambahkan:', userData);
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1.0.0/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          nrp: userData.nrp,
          role: userData.role,
          password: userData.password,
        }),
      });
      const ress = await response.json();
      alert(ress.message);

      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Gagal menambahkan user.');
        
      }
      setIsLoading(false);
      setUserData({
        username: '',
        nrp: '',
        role: 'User',
      });
      result(ress.data);
      handleOpenAddUser();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={openAddUser} handler={handleOpenAddUser}>
      <DialogHeader>Tambah User Baru</DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          <Input
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
          <Input
            label="NRP"
            name="nrp"
            value={userData.nrp}
            onChange={handleInputChange}
            required
          />
          <Select label="Role" value={userData.role} onChange={handleRoleChange} required>
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
          <Input
            label="PASSWORD"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button loading={isLoading} variant="text" color="red" onClick={handleOpenAddUser}>
          <span>Batal</span>
        </Button>
        <Button loading={isLoading} variant="gradient" color="green" onClick={handleSubmitAddUser}>
          <span>Tambah</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalAddUser;
