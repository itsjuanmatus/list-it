import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Dropdown from '../../components/Dropdowns/Dropdown';
import Header from '../../components/Header/Header';
import SearchResult from '../../components/SearchResult/SearchResult';

export default function Listings() {
  const [states, setStates] = React.useState<any>({});

  const router = useRouter();

  // get params from url
  const { query }: NextRouter | any = router;

  useEffect(() => {
    if (query?.listings) {
      setStates(
        JSON.parse(
          Buffer.from(query.listings, 'base64')
            .toString('utf8')
            .replace(/_/g, '/')
            .replace(/\=/g, ''),
        ),
      );
    }
  }, [query]);

  useEffect(() => {
    console.log(states);
  }, [states]);

  return (
    <div className="h-screen flex flex-col items-center w-full justify-start overflow-hidden">
      <Head>
        <title>List it - Search results </title>
      </Head>
      <main className="w-full">
        <div className="flex flex-col fixed top-0 w-full z-10 h-[30vh] bg-white">
          <Header titleColor="text-blue-500" />
          <div className="flex items-center w-[92%] mx-auto gap-x-3 pb-8">
            <Dropdown label="Managua">
              <p>xd</p>
            </Dropdown>
            <Dropdown label="Cameras">
              <p>xd</p>
            </Dropdown>
            <Dropdown label="Up to $300">
              <p>xd</p>
            </Dropdown>
            <Dropdown label="June 1 - 5">
              <p>xd</p>
            </Dropdown>
            <Dropdown label="Deposits">
              <p>xd</p>
            </Dropdown>
          </div>

          <hr />
        </div>
        <div className="mt-[30vh] h-[75vh] overflow-y-auto w-[92.5%] mx-auto">
          <div className="flex flex-col gap-y-12 pb-16">
            {' '}
            {Array.from({
              length: 4,
            }).map((_, i) => (
              <SearchResult key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
