import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { User } from "../types/typing";

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        let provider: string;

        if (authUser?.providerData[0]?.providerId === "google.com") {
          provider = "Google";
        } else if (authUser?.providerData[0]?.providerId === "facebook.com") {
          provider = "Facebook";
        } else {
          provider = "Email";
        }
        let userToSave = {
          id: null,
          email: authUser.email,
          emailConfirmed: authUser.emailVerified,
          displayName: authUser?.displayName,
          photoUrl: authUser?.photoURL,
          uid: authUser.uid,
          phoneNumber: authUser?.phoneNumber,
          provider,
        };

        fetch(`http://localhost:3000/api/users/${userToSave?.uid}`, {
          method: "POST",
          mode: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToSave),
        })
          .then((value) => value.json())
          .then((res) => {
            setUser({
              email: res.user[0]?.email,
              emailConfirmed: res.user[0]?.emailConfirmed,
              displayName: res.user[0]?.displayName,
              photoUrl: res.user[0]?.photoUrl,
              uid: res.user[0]?.uid,
              phoneNumber: res.user[0]?.phoneNumber,
              id: res.user[0]?._id,
              provider,
            });
          });
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
