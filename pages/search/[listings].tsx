import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Dropdown from '../../components/Dropdowns/Dropdown';
import Header from '../../components/Header/Header';
import SearchResult from '../../components/SearchResult/SearchResult';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Listings() {
  const [states, setStates] = React.useState<any>({});
  const [listings, setListings] = React.useState<any>([]);
  const accesstoken = useLocalStorage('accessToken');

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

  const findAvailableListings = async () => {
    const startDate = new Date(states.checkIn.value).toISOString();

    const endDate =
      new Date(states.checkOut.value).toISOString() ||
      new Date(Date.now() + 86400000).toISOString(); // tomorrow's date

    const cityId = states.location.id;
    const productName = states.product.value;

    const response = await fetch(
      `/api/listing/findAvailableListings/?cityId=${cityId}&productName=${productName}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
        headers: {
          accesstoken,
        },
      },
    );

    const data = await response.json();

    return data;
  };

  useEffect(() => {
    if (!states.checkIn?.value) return;

    console.log(states);

    findAvailableListings().then((data) => {
      setListings(data);
    });
  }, [states]);

  return (
    <div className="h-screen flex flex-col items-center w-full justify-start overflow-hidden max-w-[75rem] mx-auto">
      <Head>
        <title>List it - Search results </title>
      </Head>
      <main className="w-full flex flex-col gap-y-5">
        <div className="flex flex-col top-0 w-full bg-white">
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
        <div className="h-[75vh] overflow-y-auto w-[92.5%] mx-auto">
          <div className="flex flex-col gap-y-12 pb-16">
            {' '}
            {listings.length > 0 &&
              listings.map((listing: any) => {
                return (
                  <SearchResult
                    key={listing.id}
                    title={listing.title}
                    price={listing.price}
                  />
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
