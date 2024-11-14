import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { CircleAlert } from 'lucide-react';

export function ModalLogout({ handleOpen, open, handleSignOut }) {

  return (
    <>
      <Dialog className="bg-gray-800" open={open} handler={handleOpen}>
        <DialogHeader className="text-center flex items-center justify-center ">
          <CircleAlert className="w-[200px] h-auto text-white" />
        </DialogHeader>
        <DialogBody className="text-center text-white text-2xl">Yakin Logout?</DialogBody>
        <DialogFooter className="border-t border-gray-700">
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSignOut}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
