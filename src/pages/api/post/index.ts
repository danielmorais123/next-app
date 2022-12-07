import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

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
      res.json(myPost);
      break;
    case "GET":
      let posts = await db.collection("post").find({}).toArray();
      console.log({posts})
      res.json({ posts });
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
  }
}
