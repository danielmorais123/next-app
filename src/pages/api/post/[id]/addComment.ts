import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "POST":
      let postId = req.body.id;
      let objectToUpdate = {
        comments: {
          comment: req.body.comment,
          user: req.body.user,
          created_at: req.body.created_at,
        },
      };
      let myPost = await db.collection("post").updateOne(
        { _id: new ObjectId(postId) },
        {
          $push: objectToUpdate,
        }
      );
      let myPostById = await db
        .collection("post")
        .findOne({ _id: new ObjectId(postId) });
      res.json({
        myPost,
        created_at:
          myPostById.comments[myPostById.comments.length - 1].created_at,
      });

      break;

    default:
      res.setHeader("Allow", ["POST"]);
  }
}
