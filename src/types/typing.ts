import { ObjectId } from "mongodb";

export type User = {
  email: string | null;
  uid: string;
  photoUrl: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  emailConfirmed: boolean | null;
  id: string | null;
  provider: string | null;
};

export type PostType = {
  user: User;
  _id: string | null;
  comment: string | null;
  fileName: string | null;
  comments: [] | null;
  likes: [] | null;
  created_at: string | null;
};

export type UpdateUserObject = {
  displayName?: string | null;
  photoUrl?: string | null;
  phoneNumber?: string | null;
};

export interface UserToAdd {
  email: string | null;
  uid: string;
  photoUrl: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  emailConfirmed: boolean | null;
  _id: string | null;
  provider: string | null;
}

export interface Notification {
  userId: string;
  _id: ObjectId;
  notifications: NotificationList[];
}

export interface NotificationList {
  type: string;
  description: string;
  userSender: User | null;
  created_at: string | Date;
  userSenderId: string | null;
}

export interface FriendsList {
  status: string;
  friendId: string;
  sent: boolean;
  created_at: string;
  user: User;
}
