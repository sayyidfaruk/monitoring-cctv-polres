'use client';
import React from 'react';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
  Button,
} from '@material-tailwind/react';
import { CctvIcon, PowerIcon, User2Icon, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModalLogout } from './__ModalLogout';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const dataMenu = [
  { name: 'User', icon: <User2Icon className="h-5 w-5" />, href: '/v1/admin' },
  { name: 'Live cctv', icon: <CctvIcon className="h-5 w-5" />, href: '/v1/admin/cctv' },
];
export function AppShellAdmin({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/v1/admin/login');
    } catch (error) {
      console.error('Error during sign-out:', error);
    } finally {
      handleOpen();
    }
  };
  const pathname = usePathname();
  return (
    <div className="flex h-screen relative">
      <ModalLogout handleOpen={handleOpen} open={open} handleSignOut={handleSignOut} />
      <Card className="h-screen fixed w-full max-w-[20rem] z-20 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 flex items-center gap-4 p-4">
          <Image src="/logoPolri.png" alt="logo" className="h-14 w-14" width={300} height={300} />
          <Typography variant="h5" color="black">
            TIK POLRI
          </Typography>
        </div>
        <List>
          {dataMenu.map((item) => (
            <Link key={item.name} href={item.href} passHref>
              <ListItem
                className={pathname === item.href ? 'bg-gray-400 text-white' : ''}
              >
                <ListItemPrefix>{item.icon}</ListItemPrefix>
                {item.name}
              </ListItem>
            </Link>
          ))}
        </List>
        <Button className="flex gap-2 items-center" onClick={handleOpen}>
          <PowerIcon className="h-5 w-5" />
          Log Out
        </Button>
      </Card>
      <div className="flex flex-1 flex-col w-full pl-[330px] relative">
        <nav className="w-full h-[60px] pr-1">
          <div className="h-full rounded-lg bg-white">
            <div className="flex items-center justify-end h-full gap-2 pr-4">
              <UserCircle className="w-11 h-auto text-black" />
              <p className="text-black">{session && session.user.username}</p>
            </div>
          </div>
        </nav>
        <main className="flex-1 pr-1 overflow-auto mt-2 text-black">{children}</main>
      </div>
    </div>
  );
}
