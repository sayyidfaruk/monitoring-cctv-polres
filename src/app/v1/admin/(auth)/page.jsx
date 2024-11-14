'use client';
import { TableUser } from '@/components/__TableUser';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function DashboardPage() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState([]);
  const fetchDatauser = async () => {
    try {
      const ress = await fetch('/api/v1.0.0/auth/users');
      const user = await ress.json();
      console.log('users', user);
      setDataUser(user);
    } catch (error) {
      console.log(error);
      await signOut({ redirect: false });
      router.push('/v1/admin/login');
    }
  };
  useEffect(() => {
    fetchDatauser();
  }, []);
  return (
    dataUser &&
    dataUser.length > 0 && (
      <>
        {/* {dataUser.map((item, index) => (
          <p key={index}>oke</p>
        ))} */}
        <TableUser datas={dataUser || []} />
      </>
    )
  );
}

export default DashboardPage;
