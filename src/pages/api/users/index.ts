import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "GET":
      const users = await db.collection("user").find({}).toArray();

      return res.json({ users });
    default:
      res.json({ err: `${req.method} not allowed` });
  }
}
