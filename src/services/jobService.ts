import {
   collection,
   getDocs,
   doc,
   getDoc,
   addDoc,
   updateDoc,
   query,
   where,
   limit,
} from "firebase/firestore";
import type { Query, DocumentData } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Job {
   id: string;
   title: string;
   company: string;
   logo: string;
   location: string;
   type: string;
   category: string;
   tags: string[];
   salary: string;
   postedDate: string;
   description: string;
   requirements: string[];
   benefits: string[];
   companyWebsite: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
}

class JobService {
   private collectionName = "jobs";

   // Get all jobs
   async getAllJobs(): Promise<Job[]> {
      try {
         const jobsCollection = collection(db, this.collectionName);
         // Temporarily remove orderBy to avoid composite index requirement
         const jobsQuery = query(jobsCollection, where("isActive", "==", true));
         const querySnapshot = await getDocs(jobsQuery);

         // Sort on the client side instead
         const jobs = querySnapshot.docs.map(
            (doc) =>
               ({
                  id: doc.id,
                  ...doc.data(),
               } as Job)
         );

         // Sort by createdAt descending on client side
         return jobs.sort(
            (a, b) =>
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
         );
      } catch (error) {
         console.error("Error fetching jobs:", error);
         throw error;
      }
   }

   // Get job by ID
   async getJobById(id: string): Promise<Job | null> {
      try {
         const jobDoc = doc(db, this.collectionName, id);
         const jobSnapshot = await getDoc(jobDoc);

         if (jobSnapshot.exists()) {
            return {
               id: jobSnapshot.id,
               ...jobSnapshot.data(),
            } as Job;
         }

         return null;
      } catch (error) {
         console.error("Error fetching job:", error);
         throw error;
      }
   }

   // Search jobs
   async searchJobs(searchTerm: string): Promise<Job[]> {
      try {
         const jobs = await this.getAllJobs();

         // Client-side filtering for now (Firestore full-text search is limited)
         return jobs.filter(
            (job) =>
               job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
               job.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
               job.tags.some((tag) =>
                  tag.toLowerCase().includes(searchTerm.toLowerCase())
               )
         );
      } catch (error) {
         console.error("Error searching jobs:", error);
         throw error;
      }
   }

   // Filter jobs
   async filterJobs(filters: {
      location?: string;
      type?: string;
      category?: string;
      salary?: string;
   }): Promise<Job[]> {
      try {
         let jobsQuery: Query<DocumentData> = collection(
            db,
            this.collectionName
         );

         // Add filters
         jobsQuery = query(jobsQuery, where("isActive", "==", true));

         if (filters.location) {
            jobsQuery = query(
               jobsQuery,
               where("location", "==", filters.location)
            );
         }

         if (filters.type) {
            jobsQuery = query(jobsQuery, where("type", "==", filters.type));
         }

         if (filters.category) {
            jobsQuery = query(
               jobsQuery,
               where("category", "==", filters.category)
            );
         }

         // Remove orderBy to avoid composite index requirement
         const querySnapshot = await getDocs(jobsQuery);

         // Sort on the client side instead
         const jobs = querySnapshot.docs.map(
            (doc) =>
               ({
                  id: doc.id,
                  ...doc.data(),
               } as Job)
         );

         // Sort by createdAt descending on client side
         return jobs.sort(
            (a, b) =>
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
         );
      } catch (error) {
         console.error("Error filtering jobs:", error);
         throw error;
      }
   }

   // Get featured jobs (latest 3)
   async getFeaturedJobs(): Promise<Job[]> {
      try {
         const jobsCollection = collection(db, this.collectionName);
         // Remove orderBy to avoid composite index requirement
         const featuredQuery = query(
            jobsCollection,
            where("isActive", "==", true),
            limit(10) // Get more jobs to ensure we have enough after filtering
         );

         const querySnapshot = await getDocs(featuredQuery);

         // Sort on the client side and take the latest 3
         const jobs = querySnapshot.docs.map(
            (doc) =>
               ({
                  id: doc.id,
                  ...doc.data(),
               } as Job)
         );

         // Sort by createdAt descending and take the first 3
         return jobs
            .sort(
               (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
            )
            .slice(0, 3);
      } catch (error) {
         console.error("Error fetching featured jobs:", error);
         throw error;
      }
   }

   // Add new job (for employers)
   async addJob(
      jobData: Omit<Job, "id" | "createdAt" | "updatedAt">
   ): Promise<string> {
      try {
         const now = new Date().toISOString();
         const jobWithTimestamps = {
            ...jobData,
            createdAt: now,
            updatedAt: now,
            isActive: true,
         };

         const docRef = await addDoc(
            collection(db, this.collectionName),
            jobWithTimestamps
         );
         return docRef.id;
      } catch (error) {
         console.error("Error adding job:", error);
         throw error;
      }
   }

   // Update job
   async updateJob(id: string, jobData: Partial<Job>): Promise<void> {
      try {
         const jobDoc = doc(db, this.collectionName, id);
         const updateData = {
            ...jobData,
            updatedAt: new Date().toISOString(),
         };

         await updateDoc(jobDoc, updateData);
      } catch (error) {
         console.error("Error updating job:", error);
         throw error;
      }
   }

   // Delete job (soft delete)
   async deleteJob(id: string): Promise<void> {
      try {
         const jobDoc = doc(db, this.collectionName, id);
         await updateDoc(jobDoc, {
            isActive: false,
            updatedAt: new Date().toISOString(),
         });
      } catch (error) {
         console.error("Error deleting job:", error);
         throw error;
      }
   }
}

export const jobService = new JobService();
