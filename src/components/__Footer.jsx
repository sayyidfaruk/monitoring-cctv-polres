import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-black py-6 text-center rounded-[20px] mt-14">
      <div className="max-w-screen-2xl mx-auto px-5">
        <p className="text-white">© 2024 TIK POLRES GARUT by Arsenyogie. All rights reserved.</p>
        <ul className="flex items-center w-full justify-center my-2 gap-4">
          <li>
            <Link className="text-white" href="#">
              Facebook
            </Link>
          </li>
          <li>
            <Link className="text-white" href="#">
              Twitter
            </Link>
          </li>
          <li>
            <Link className="text-white" href="#">
              Instagram
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
