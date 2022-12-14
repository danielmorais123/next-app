import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "POST":
      let body = req.body;

      let myPost = await db.collection("post").insertOne(body);
      let postById = await db
        .collection("post")
        .findOne({ _id: new ObjectId(myPost.insertedId) });
      res.json(postById);
      break;
    case "GET":
      let posts = await db.collection("post").find({}).toArray();

      res.json({ posts });
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
  }
}
