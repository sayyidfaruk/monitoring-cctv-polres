import Image from 'next/image';
import React from 'react';

function Profile() {
  return (
    <div>
      <p className="text-white text-center text-2xl mt-4 font-bold">PROFILE</p>
      <Image
        className="mx-auto mt-4"
        width={1200}
        height={1200}
        src="/profile.png"
        alt="profile"
      ></Image>
    </div>
  );
}

export default Profile;
