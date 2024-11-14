'use client';
import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
function ModalDeleteUser({ openDeleteUser, handleOpenDeleteUser, data, result }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1.0.0/auth/users/' + data['id-users'], {
        method: 'DELETE',
      });
      const ress = await response.json();
      alert(ress.message);

      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Gagal menghapus user.');
      }
      setIsLoading(false);
      result(data['id-users']);
      handleOpenDeleteUser();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Dialog open={openDeleteUser} handler={() => handleOpenDeleteUser(null)}>
      <DialogHeader>Konfirmasi Hapus User</DialogHeader>
      <DialogBody>
        Apakah Anda yakin ingin menghapus user{' '}
        <span className="font-semibold">{data.username}</span>? Tindakan ini tidak dapat dibatalkan.
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="blue-gray"
          loading={isLoading}
          onClick={() => handleOpenDeleteUser(null)}
        >
          <span>Batal</span>
        </Button>
        <Button
          loading={isLoading}
          variant="gradient"
          color="red"
          onClick={() => handleDeleteUser()}
        >
          <span>Hapus</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalDeleteUser;
