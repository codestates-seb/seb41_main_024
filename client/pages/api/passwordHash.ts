import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function hashPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const saltRounds = 10;
  const { pw } = req.body;

  const result = bcrypt.hash(pw, saltRounds, function (err, hash) {
    // Store hash in your password DB.

    return res.status(201).json({ hashedPassword: hash });
  });
}
