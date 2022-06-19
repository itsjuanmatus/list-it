import React from 'react';
import Link from 'next/link';
import Icon from '../Icon';
import { useRouter } from 'next/router';

export default function Sidebar({
  items,
}: {
  items: Array<{ name: string; href: string; icon: string }>;
}) {
  const router = useRouter();

  return (
    <div className="bg-primary-purple w-[15rem] flex flex-col py-5 pl-5">
      <Link href="/">
        <h1 className="text-white font-bold text-3xl cursor-pointer">
          list it
        </h1>
      </Link>
      <div className="flex flex-col gap-y-7 mt-10 font-semibold text-white">
        {items &&
          items.map(({ name, href, icon }) => (
            <Link href={href} key={name}>
              <div
                className={
                  'flex items-center gap-x-2 cursor-pointer ' +
                  (router.pathname !== href && 'opacity-75 hover:opacity-100')
                }
              >
                <Icon name={icon} size={22} />
                <p>{name.toUpperCase()}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
