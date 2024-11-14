'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { Copyright, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

function PageLogin() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const onHandlerSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const ress = await signIn('credentials', {
        redirect: false,
        nrp: formData.get('nrp'),
        password: formData.get('password'),
        callbackUrl: '/v1/admin',
      });
      if (!ress?.error) {
        window.location.href = '/v1/admin';
        // router.push('/cctv');
      } else {
        console.log(ress.error);
        alert(ress.error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  };
  return (
    <div className="lg:w-2/4 h-[70vh] flex flex-col mx-auto">
      <div className="m-auto w-full items-center justify-around h-[400px] rounded-md bg-black flex">
        <Tilt className="hidden lg:block" scale={1.1} glareEnable={false} glareMaxOpacity={0.45}>
          <Image src="/logoPolri.png" width={280} height={280} alt="logo" />
        </Tilt>
        <form className="w-full px-4 lg:px-0 lg:w-2/4" onSubmit={onHandlerSubmit}>
          <h2 className="text-white text-center font-bold text-2xl mb-3">LOGIN</h2>
          <div className="w-full flex-col relative">
            <Mail className="text-[#666666] absolute bottom-1/4 left-4 top-1/4" />

            <input
              className="text-[#666666] bg-[#E6E6E6] w-full pr-2 pl-12 h-[50px] rounded-full"
              type="text"
              name="nrp"
              placeholder="nrp"
              style={{ '::placeholder': { color: '#666666' } }}
            />
          </div>
          <div className="w-full flex-col my-3 relative">
            <Lock className="text-[#666666] absolute bottom-1/4 left-4 top-1/4" />
            <input
              className="text-[#666666] bg-[#E6E6E6] w-full pr-2 pl-12 h-[50px] rounded-full"
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <Button
            className="text-white text-center w-full py-3 mt-4 bg-[#E50909] rounded-full hover:bg-gray-800 transition-all"
            type="submit"
            loading={isLoading}
          >
            LOGIN
          </Button>
          <Link
            className="text-gray-400 flex items-center justify-center gap-2 text-center mt-2 text-sm"
            href="/"
          >
            <Copyright className="w-5" /> 2024 TIK POLRES GARUT .
          </Link>
        </form>
      </div>
    </div>
  );
}

export default PageLogin;
