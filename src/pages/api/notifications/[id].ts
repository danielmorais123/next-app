import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

interface FriendList {
  status: string;
  friendId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "GET":
      const notifications = await db
        .collection("notification")
        .find({ userId: req.query.id })
        .toArray();


      return res.json(notifications);

    default:
      res.json("HELLO");
  }
}
