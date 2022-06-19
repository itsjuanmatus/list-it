import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import Icon from '../../components/Icon';
import Sidebar from '../../components/Navigation/Sidebar';

export default function Profile() {
  const items = [
    {
      name: 'Profile',
      href: '/profile',
      icon: 'user',
    },
    {
      name: 'Settings',
      href: '/profile/settings',
      icon: 'settings',
    },
    {
      name: 'Help',
      href: '/profile/help',
      icon: 'help',
    },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      <Head>
        <title>Profile</title>
        <meta name="description" content="list it profile" />
      </Head>
      <Sidebar items={items} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <Icon name="user" size={22} />
            <p className="ml-3 text-gray-700 font-semibold text-lg">Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
