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
      let id = req.query.id;
      const friend = await db
        .collection("friend")
        .find({ userId: id })
        .toArray();
      res.json({ friend });
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
  }
}
