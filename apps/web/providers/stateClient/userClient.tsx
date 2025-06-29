"use client"
import { useCurrentUser } from "@hooks/user";
import { createContext,useContext,useEffect,useState } from "react";
import { User } from "./types";


interface UserContextType {
 currentUser: User;
 signIn: (user: any) => void;
 signOut: () => void;
 isLoggedIn: boolean;
 isLoading: boolean;
 googleSignIn: () => void;
}
const UserContext= createContext<UserContextType>({
  currentUser: null,
  signIn: (user: any) => {},
  signOut: () => {},
  isLoggedIn: false,
  isLoading: false,
  googleSignIn:() => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user,isLoading}=useCurrentUser();
  useEffect(()=>{
      setCurrentUser(user);
      setIsLoggedIn(!!user);
  },[user,isLoading])
  const signIn = (user: any) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };
  const signOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };
  const googleSignIn = () => {
    
  };

  return (
    <UserContext.Provider value={{ currentUser, signIn, signOut, isLoggedIn, isLoading, googleSignIn }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);