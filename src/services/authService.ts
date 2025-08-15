import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export interface UserProfile {
   uid: string;
   email: string;
   name: string;
   role: "jobseeker" | "employer";
   createdAt: string;
   updatedAt: string;
}

class AuthService {
   // Register new user
   async register(
      email: string,
      password: string,
      name: string,
      role: "jobseeker" | "employer" = "jobseeker"
   ): Promise<User> {
      try {
         console.log('Attempting to register user:', { email, name, role });
         console.log('Firebase auth object:', auth);

         const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );
         const user = userCredential.user;

         console.log('User created successfully:', user.uid);

         // Update user profile
         await updateProfile(user, {
            displayName: name,
         });

         // Create user profile in Firestore
         const userProfile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            name,
            role,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
         };

         await setDoc(doc(db, "users", user.uid), userProfile);

         return user;
      } catch (error: any) {
         console.error("Error registering user:", error);
         
         // Provide more specific error messages
         if (error.code === 'auth/configuration-not-found') {
            throw new Error('Firebase configuration error. Please check your Firebase project setup and ensure Authentication service is enabled.');
         } else if (error.code === 'auth/email-already-in-use') {
            throw new Error('An account with this email already exists. Please try logging in instead.');
         } else if (error.code === 'auth/weak-password') {
            throw new Error('Password is too weak. Please use a stronger password.');
         } else if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email address. Please check your email format.');
         } else {
            throw new Error(`Registration failed: ${error.message}`);
         }
      }
   }

   // Sign in user
   async signIn(email: string, password: string): Promise<User> {
      try {
         console.log('Attempting to sign in user:', { email });
         const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
         );
         return userCredential.user;
      } catch (error: any) {
         console.error("Error signing in:", error);
         
         // Provide more specific error messages
         if (error.code === 'auth/user-not-found') {
            throw new Error('No account found with this email. Please check your email or create a new account.');
         } else if (error.code === 'auth/wrong-password') {
            throw new Error('Incorrect password. Please try again.');
         } else if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email address. Please check your email format.');
         } else if (error.code === 'auth/too-many-requests') {
            throw new Error('Too many failed attempts. Please try again later.');
         } else {
            throw new Error(`Sign in failed: ${error.message}`);
         }
      }
   }

   // Sign out user
   async signOut(): Promise<void> {
      try {
         await signOut(auth);
      } catch (error) {
         console.error("Error signing out:", error);
         throw error;
      }
   }

   // Get user profile
   async getUserProfile(uid: string): Promise<UserProfile | null> {
      try {
         const userDoc = doc(db, "users", uid);
         const userSnapshot = await getDoc(userDoc);

         if (userSnapshot.exists()) {
            return userSnapshot.data() as UserProfile;
         }

         return null;
      } catch (error) {
         console.error("Error fetching user profile:", error);
         throw error;
      }
   }

   // Update user profile
   async updateUserProfile(
      uid: string,
      profileData: Partial<UserProfile>
   ): Promise<void> {
      try {
         const userDoc = doc(db, "users", uid);
         const updateData = {
            ...profileData,
            updatedAt: new Date().toISOString(),
         };

         await setDoc(userDoc, updateData, { merge: true });
      } catch (error) {
         console.error("Error updating user profile:", error);
         throw error;
      }
   }
}

export const authService = new AuthService();
