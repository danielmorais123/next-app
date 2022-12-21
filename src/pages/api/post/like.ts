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
      let postId = req.body.postId;
      let objectToUpdate = {
        likes: {
          id: req.body.user.id,
        },
      };

      let myPost = await db.collection("post").updateOne(
        { _id: new ObjectId(postId) },
        {
          $push: objectToUpdate,
        }
      );
      res.json(myPost);
      break;

    default:
      res.setHeader("Allow", ["POST"]);
  }
}
