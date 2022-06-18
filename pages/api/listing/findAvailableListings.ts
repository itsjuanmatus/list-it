import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../types/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>,
) {
  let host = `${process.env.HOST}/listings/find-available/`;
  host += `${req.query.startDate}/`;
  host += `${req.query.endDate}/`;
  host += `${req.query.cityId}/`;
  host += `${req.query.productName}/`;
  host += `${req.query.countryId}`;

  const data = await fetch(host, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.headers.accesstoken}`,
    },
  }).then((res) => res.json());

  return res.status(200).json(data);
}
