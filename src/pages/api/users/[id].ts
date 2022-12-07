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
      const user = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();
      if (user.length === 0) {
        await db.collection("user").insertOne({
          uid: req.body.uid,
          displayName: req.body.displayName,
          photoURL: req.body.photoURL,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          emailConfirmed: req.body.emailConfirmed,
          created_at: new Date(),
        });
        return res.json({ inserted: true });
      }
      return res.json({ inserted: false });
    case "GET":
      const userDb = await db
        .collection("user")
        .find({ uid: req.query.id })
        .toArray();

      return res.json({ user: userDb[0] });
    default:
      res.json({ err: `${req.method} not allowed` });
  }
}
