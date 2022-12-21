import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { FriendsList } from "../../../types/typing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("nextjsmongo");
  switch (req.method) {
    case "PUT":
      let body = req.body;
      const { userId, friendId, type, toAddUser, user } = body;
      const authUserFriends = await db
        .collection("friend")
        .find({ userId })
        .toArray();
      if (type === "Friend Request") {
        if (
          !authUserFriends[0]?.friends.find(
            (element: FriendsList) => element.friendId === friendId
          )
        ) {
          let objectToUpdateAuthUser = {
            friends: {
              status: "pending",
              friendId,
              sent: true,
              created_at: new Date(),
            },
          };
          let objectToUpdateFriendUser = {
            friends: {
              status: "pending",
              friendId: userId,
              sent: false,
              created_at: new Date(),
            },
          };
          await db
            .collection("friend")
            .updateOne({ userId }, { $push: objectToUpdateAuthUser });

          await db
            .collection("friend")
            .updateOne(
              { userId: friendId },
              { $push: objectToUpdateFriendUser }
            );

          await db.collection("notification").updateOne(
            {
              userId: friendId,
            },
            {
              $push: {
                notifications: {
                  type: "Accept Friend Request",
                  description: `${user?.displayName} sent a friend request`,
                  created_at: new Date(),
                  userSender: user,
                  userSenderId: user?.id,
                },
              },
            }
          );

          const friendsUser = await db
            .collection("friend")
            .find({ userId })
            .toArray();

          return res.json({ friendsUser });
        }
        return res.json({
          status: `Waiting for ${toAddUser.displayName} to accept your friend request`,
        });
      } else if (type === "Accept Friend Request") {
        const friendUserToAccept = authUserFriends[0]?.friends.find(
          (element: FriendsList) =>
            element.friendId === friendId &&
            element?.status === "pending" &&
            !element.sent
        );
        if (!friendUserToAccept) {
          return res.json({ status: "No User to accept friend request" });
        }

        await db.collection("friend").updateOne(
          {
            userId,
            friends: { $elemMatch: { friendId } },
          },
          {
            $set: {
              "friends.$[el].status": "accepted",
            },
          },
          { arrayFilters: [{ "el.friendId": friendId }] }
        );

        await db.collection("friend").updateOne(
          {
            userId: friendId,
            friends: { $elemMatch: { friendId: userId } },
          },
          {
            $set: {
              "friends.$[el].status": "accepted",
            },
          },
          { arrayFilters: [{ "el.friendId": userId }] }
        );

        await db.collection("notification").updateOne(
          {
            userId: friendId,
          },
          {
            $push: {
              notifications: {
                type: "Friend Request Accepted",
                description: `${user?.displayName} accepted your friend request`,
                created_at: new Date(),
                userSender: user,
                userSenderId: user?.id,
              },
            },
          }
        );

        const friendsUser = await db
          .collection("friend")
          .find({ userId })
          .toArray();

        return res.json({ friendsUser });
      }

      res.json({ exists: true });
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
  }
}
