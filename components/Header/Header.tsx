import React from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ titleColor = 'text-white' }) {
  return (
    <div className="flex w-11/12 mx-auto justify-between py-6">
      <Link href="/">
        <div className='cursor-pointer'>
          <h1 className={`${titleColor} text-2xl font-bold`}>list it</h1>
        </div>
      </Link>
      <SearchBar />
      <Image
        src="https://source.unsplash.com/random/400x400"
        alt="user"
        width={45}
        height={45}
        objectFit="cover"
        className="cursor-pointer rounded-full"
      />
    </div>
  );
}
