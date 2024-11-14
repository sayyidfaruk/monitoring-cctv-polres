'use client';
import React from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
} from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Cctv, Group, House, LogOut } from 'lucide-react';
import { ModalLogout } from './__ModalLogout';

export function Appshell() {
  const { data: session } = useSession();
  console.log('session', session);
  const router = useRouter();
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Error during sign-out:', error);
    } finally {
      handleOpen();
    }
  };
  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10">
      <Typography
        as="li"
        variant="lead"
        // color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link href="/" className="flex gap-2 items-center hover:text-gray-300">
          <House className="w-5 block lg:hidden" />
          Beranda
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="lead"
        // color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link href="/profile" className="flex gap-2 items-center hover:text-gray-300">
          <Group className="w-5 block lg:hidden" />
          Profile
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="lead"
        // color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link href={`http://${process.env.NEXT_PUBLIC_IP}:5173`} className="flex gap-2 items-center hover:text-gray-300">
          <Group className="w-5 block lg:hidden" />
          Pengumuman
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="lead"
        // color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link href="/cctv" className="flex gap-2 items-center hover:text-gray-300">
          <Cctv className="text-red-400 hover:text-red-300" />
          Live cctv
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className=" max-w-full px-4 py-2 lg:px-8 lg:py-4 bg-transparent border-none">
      <ModalLogout handleOpen={handleOpen} open={open} handleSignOut={handleSignOut} />
      <div className=" flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image src="/logoPolri.png" height={70} width={70} alt="tik polri" />
          <Typography as="a" href="#" className="mr-4 text-logo">
            TIK POLRES GARUT
          </Typography>
        </div>
        <div className="hidden lg:flex">{navList}</div>
        {session && session.user.role === 'User' && (
          <div className="flex items-center gap-x-1">
            <Button
              variant="text"
              size="lg"
              className="hidden lg:flex items-center font-bold text-red-500"
              onClick={handleOpen}
            >
              <LogOut />
              <span>Logout</span>
            </Button>
          </div>
        )}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            {session && session.role === 'User' && (
              <Button
                fullWidth
                variant="text"
                size="sm"
                className="flex  -ml-2 gap-2 font-bold text-red-500 "
                onClick={handleOpen}
              >
                <LogOut />
                <span className="font-medium text-base">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
