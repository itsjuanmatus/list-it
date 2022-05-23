import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    access_token: string;
  }>,
) {
  let host = `${process.env.HOST}/auth/login`;

  const data = await fetch(host, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: req.body.email,
      password: req.body.password,
    }),
  }).then((res) => res.json());

  return res.status(200).json(data);
}
