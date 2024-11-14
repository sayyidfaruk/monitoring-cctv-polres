'use client';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function CttvPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [dataCctv, setDataCctv] = useState([]);
  const fetchDataCctv = async () => {
    try {
      const ress = await fetch('/api/v1.0.0/auth/cctv');
      const cctv = await ress.json();
      setDataCctv(cctv);
    } catch (error) {
      console.log(error);
      await signOut({ redirect: false });
      router.push('/cctv/login');
    }
  };
  useEffect(() => {
    fetchDataCctv();
  }, []);
  return session && dataCctv.length > 0 ? (
    <div className="mt-4 lg:mt-20 px-3">
      <h2 className="text-center text-3xl text-white mt-2 mb-4 font-bold">CCTV JALUR</h2>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {dataCctv &&
          dataCctv.length > 0 &&
          dataCctv.map((item, index) => (
            <div className="bg-gray-800 rounded-md border border-gray-100 p-2" key={item.name}>
              <p className="text-white mb-1">{item.name}</p>
              <video width="600" height="300" autoPlay controls loop>
                <source src={item.stream} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div className="mt-4 lg:mt-20 px-3">
      <h2 className="text-center text-3xl text-white mt-2 mb-4 font-bold">CCTV JALUR</h2>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            className="bg-gray-800 rounded-md border border-gray-100 p-2 w-full h-[300px] "
            key={index}
          >
            <div className="w-[66%] mt-2 h-[5%] bg-gray-600  animate-pulse rounded-md" />
            <div className="w-full mt-4 h-[80%] bg-gray-600  animate-pulse rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CttvPage;
