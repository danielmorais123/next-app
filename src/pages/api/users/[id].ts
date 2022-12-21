import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { UpdateUserObject } from "../../../types/typing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "POST":
      const user = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();
      if (user.length === 0) {
        await db.collection("user").insertOne({
          uid: req.body.uid,
          displayName: req.body.displayName,
          photoUrl: req.body.photoUrl,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          emailConfirmed: req.body.emailConfirmed,
          created_at: new Date(),
        });

        const userDbToReturn = await db
          .collection("user")
          .find({ uid: req.query.id })
          .toArray();

        await db.collection("notification").insertOne({
          userId: userDbToReturn[0]._id.toString(),
          notifications: [],
        });
        await db.collection("friend").insertOne({
          userId: userDbToReturn[0]._id.toString(),
          friends: [],
        });
        return res.json({ inserted: true, user: userDbToReturn[0] });
      }
      return res.json({ inserted: false, user });
    case "GET":
      const userDb = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();

      return res.json({ user: userDb[0] });
    case "PUT":
      var objectToUpdate: UpdateUserObject = {};

      if (req.body?.name) objectToUpdate.displayName = req.body.name;
      if (req.body?.fileName) objectToUpdate.photoUrl = req.body.fileName;

      await db.collection("user").updateOne(
        { uid: req.query.id },
        {
          $set: objectToUpdate,
        }
      );
      const userDbToReturn = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();

      return res.json({ user: userDbToReturn[0] });
    case "GET":
      const u = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();

      return res.json({ u });
    default:
      res.json({ err: `${req.method} not allowed` });
  }
}
