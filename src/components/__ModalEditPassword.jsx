import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from '@material-tailwind/react';

function ModalUpdatePassword({ openUpdatePassword, handleOpenUpdatePassword, userId, closeModal }) {
  const [newPassword, setNewPassword] = useState('');

  const handleInputChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmitUpdatePassword = async () => {
    try {
      const response = await fetch(`/api/v1.0.0/auth/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const result = await response.json();
      alert(result.message);

      if (!response.ok) {
        throw new Error('Failed to update password.');
      }

      setNewPassword('');
      handleOpenUpdatePassword();
      closeModal();
    } catch (error) {
      console.log(error);
      alert('An error occurred while updating the password.');
    }
  };

  return (
    <Dialog open={openUpdatePassword} handler={handleOpenUpdatePassword}>
      <DialogHeader>Update Password</DialogHeader>
      <DialogBody>
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleInputChange}
          required
        />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpenUpdatePassword}>
          <span>Batal</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmitUpdatePassword}>
          <span>Update</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalUpdatePassword;
