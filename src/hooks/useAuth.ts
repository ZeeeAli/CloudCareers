import { useState, useEffect } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { authService } from "../services/authService";
import type { UserProfile } from "../services/authService";

export const useAuth = () => {
   const [user, setUser] = useState<User | null>(null);
   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         setUser(user);

         if (user) {
            try {
               const profile = await authService.getUserProfile(user.uid);
               setUserProfile(profile);
            } catch (error) {
               console.error("Error fetching user profile:", error);
            }
         } else {
            setUserProfile(null);
         }

         setLoading(false);
      });

      return () => unsubscribe();
   }, []);

   const signIn = async (email: string, password: string) => {
      return authService.signIn(email, password);
   };

   const register = async (
      email: string,
      password: string,
      name: string,
      role: "jobseeker" | "employer" = "jobseeker"
   ) => {
      return authService.register(email, password, name, role);
   };

   const signOut = async () => {
      return authService.signOut();
   };

   return {
      user,
      userProfile,
      loading,
      signIn,
      register,
      signOut,
   };
};
