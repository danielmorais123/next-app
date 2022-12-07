export type User = {
  email: string | null;
  uid: string;
  photoUrl: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  emailConfirmed: boolean | null;
  id: string | null;
  accessToken: string | null;
};

export type PostType = {
  user: User;
  id: string | null;
  comment: string | null;
  fileName: string | null;
};
