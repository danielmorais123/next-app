import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("user").insertOne(bodyObject);
      res.json(myPost);
      break;
    case "GET":
      res.json({ status: "hey" });
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
  }
}
