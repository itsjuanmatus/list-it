import type { NextApiRequest, NextApiResponse } from 'next';
import type { City } from '../../../types/location/City';
import { getSession } from 'next-auth/react';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<City[]>,
) {

  let host = `${process.env.HOST}/cities/search/`;
  host += `${req.query.name}`;

  const session = await getSession({ req });

  const data = await fetch(host, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
  }).then((res) => res.json());
  return res.status(200).json(data);
}
