import Link from 'next/link';
import React from 'react';
import Head from 'next/head';

export default function Profile() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Head>
        <title>Profile</title>
        <meta name="description" content="list it profile" />
      </Head>
      <div className="bg-primary-purple w-[15vw] flex flex-col py-5 pl-5">
        <Link href="/">
          <h1 className="text-white font-bold text-3xl cursor-pointer">
            list it
          </h1>
        </Link>
        <div className="flex flex-col gap-y-7 mt-10 font-semibold text-white">
          <div className="flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>PROFILE</p>
          </div>
          <div className="flex items-center text-white opacity-80 gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>

            <p className="text-white">SETTINGS</p>
          </div>{' '}
          <div className="flex items-center text-white opacity-80 gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <p className="text-white opacity-80">HELP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
