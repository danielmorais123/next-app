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
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log({ firebase: user });
        setUser({
          accessToken: user.accessToken,
          id: null,
          email: user.email,
          emailConfirmed: user.emailVerified,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid,
          phoneNumber: user.phoneNumber,
        });
        fetch(`http://localhost:3000/api/users/${user?.uid}`, {
          method: "POST",
          mode: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((value) => value.json())
          .then((res) => {
            console.log({ res });
          });

        fetch(`http://localhost:3000/api/users/${user?.uid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log({ data });
            setUser({
              accessToken: data.user.accessToken,
              id: data.user._id,
              email: user.email,
              emailConfirmed: data.user?.emailVerified,
              displayName: data.user?.displayName,
              photoUrl: data.user?.photoURL,
              uid: data.user?.uid,
              phoneNumber: data.user?.phoneNumber,
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
