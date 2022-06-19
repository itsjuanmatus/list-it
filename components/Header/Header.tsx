import React, { useRef } from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';

export default function Header({ titleColor = 'text-white' }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, () => setIsOpen(false));

  return (
    <div className="flex w-11/12 mx-auto justify-between py-6 max-w-[75rem]">
      <Link href="/">
        <div className="cursor-pointer">
          <h1 className={`${titleColor} text-2xl font-bold`}>list it</h1>
        </div>
      </Link>
      <SearchBar />
      <div className="relative">
        <button
          className={`flex items-center justify-center p-1 border-2 ${
            isOpen ? 'rounded-full border-blue-500' : 'border-transparent'
          }`}
          onClick={toggleMenu}
        >
          <Image
            src="https://source.unsplash.com/random/400x400"
            alt="user"
            width={45}
            height={45}
            objectFit="cover"
            className="cursor-pointer rounded-full"
          />
        </button>
        <div
          ref={menuRef}
          className={`absolute bg-white rounded-md right-0 shadow-lg w-[10vw] mt-3 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <Link href="/profile">
              <a className="text-gray-600 text-sm h-full w-full hover:bg-slate-300 py-3 pl-2 rounded-md">
                Profile
              </a>
            </Link>
            <Link href="/">
              <a className="text-gray-600 text-sm h-full w-full hover:bg-slate-300 py-3 pl-2 rounded-md">
                Settings
              </a>
            </Link>
            <Link href="/">
              <a className="text-gray-600 text-sm h-full w-full hover:bg-slate-300 py-3 pl-2 rounded-md">
                Logout
              </a>
            </Link>

            <Link href="/">
              <a className="text-gray-600 text-sm h-full w-full hover:bg-slate-300 py-3 pl-2 rounded-md">
                Help
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
