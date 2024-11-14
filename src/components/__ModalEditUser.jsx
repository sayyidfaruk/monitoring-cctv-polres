'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import ModalUpdatePassword from './__ModalEditPassword';

function ModalEditUser({ openEditUser, handleOpenEditUser, data, result }) {
  const [userData, setUserData] = useState({
    username: '',
    nrp: '',
    role: 'User',
  });
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenUpdatePassword = () => setOpenUpdatePassword(!openUpdatePassword);
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setUserData((prevUserData) => ({ ...prevUserData, role: value }));
  };

  const handleSubmitEditUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1.0.0/auth/users/${data['id-users']}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          nrp: userData.nrp,
          role: userData.role,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        setIsLoading(false);
        alert(`Error: ${responseData.message || 'Gagal mengupdate user.'}`);
        return;
      }
      setIsLoading(false);
      alert(responseData.message || 'User berhasil diupdate.');
      result(responseData.data);
      setUserData({
        username: '',
        nrp: '',
        role: 'User',
      });
      handleOpenEditUser();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert('Terjadi kesalahan saat mengupdate user.');
    }
  };

  return (
    <Dialog open={openEditUser} handler={handleOpenEditUser}>
      <DialogHeader>Edit User</DialogHeader>
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
          <div className="mt-6">
            <Typography className="bg-non" onClick={() => handleOpenUpdatePassword()}>
              Reset Password
            </Typography>
            <ModalUpdatePassword
              openUpdatePassword={openUpdatePassword}
              handleOpenUpdatePassword={() => setOpenUpdatePassword(false)}
              userId={data['id-users']}
              closeModal={handleOpenEditUser}
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button loading={isLoading} variant="text" color="red" onClick={handleOpenEditUser}>
          <span>Batal</span>
        </Button>
        <Button loading={isLoading} variant="gradient" color="green" onClick={handleSubmitEditUser}>
          <span>Simpan</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalEditUser;
