import React from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex w-11/12 m-auto justify-between py-6">
      <div>
        <h1 className="text-white text-2xl font-bold">list it</h1>
      </div>
      <SearchBar />
      <Image
        src="https://source.unsplash.com/random/400x400"
        alt="user"
        width={55}
        height={55}
        className="cursor-pointer rounded-full"
      />
    </div>
  );
}
