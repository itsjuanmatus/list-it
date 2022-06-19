import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../types/Product';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>,
) {
  const { query } = req;
  console.log(query);

  let host = `${process.env.HOST}/listings/find-available/`;

  host += `${req.query.startDate}/`;
  host += `${req.query.endDate}/`;
  host += `${req.query.cityId}/`;
  host += `${req.query.productName}`;

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
