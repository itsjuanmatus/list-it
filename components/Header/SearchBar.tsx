import React from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  // if path is / then return null
  const router = useRouter();
  if (router.pathname === '/') return null;
  return (
    <input className="bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:shadow-outline" />
  );
}
