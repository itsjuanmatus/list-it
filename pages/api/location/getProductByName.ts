import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../types/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>,
) {
  let host = `${process.env.HOST}/products/search/`;
  host += `${req.query.name}`;

  const data = await fetch(host, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  }).then((res) => res.json());

  return res.status(200).json(data);
}
