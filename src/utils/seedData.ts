import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export interface SeedJob {
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

const sampleJobs: SeedJob[] = [
   {
      title: "Senior React Developer",
      company: "TechCorp",
      logo: "https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=TC",
      location: "New York, NY",
      type: "Full-time",
      category: "Software Development",
      tags: ["React", "TypeScript", "Firebase", "Frontend"],
      salary: "$120,000 - $150,000",
      postedDate: "2024-01-15",
      description:
         "We are looking for a senior React developer to join our team and help build amazing web applications.",
      requirements: [
         "5+ years of experience with React",
         "Strong TypeScript skills",
         "Experience with modern frontend tools",
         "Good understanding of web performance",
      ],
      benefits: [
         "Health insurance",
         "401k matching",
         "Flexible work hours",
         "Remote work options",
      ],
      companyWebsite: "https://techcorp.com",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   },
   {
      title: "Frontend Engineer",
      company: "StartupXYZ",
      logo: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=SX",
      location: "San Francisco, CA",
      type: "Full-time",
      category: "Software Development",
      tags: ["JavaScript", "React", "CSS", "UI/UX"],
      salary: "$90,000 - $120,000",
      postedDate: "2024-01-14",
      description:
         "Join our fast-growing startup and help shape the future of our product.",
      requirements: [
         "3+ years of frontend development experience",
         "Proficient in React and modern JavaScript",
         "Strong CSS skills",
         "Experience with responsive design",
      ],
      benefits: [
         "Competitive salary",
         "Equity options",
         "Flexible PTO",
         "Learning budget",
      ],
      companyWebsite: "https://startupxyz.com",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   },
   {
      title: "UI/UX Designer",
      company: "DesignStudio",
      logo: "https://via.placeholder.com/100x100/F59E0B/FFFFFF?text=DS",
      location: "Austin, TX",
      type: "Contract",
      category: "Design",
      tags: ["UI/UX", "Figma", "Prototyping", "User Research"],
      salary: "$80,000 - $100,000",
      postedDate: "2024-01-13",
      description:
         "We need a talented UI/UX designer to help create beautiful and functional user experiences.",
      requirements: [
         "Portfolio showcasing UI/UX work",
         "Experience with Figma or similar tools",
         "Understanding of user-centered design",
         "Ability to work with development teams",
      ],
      benefits: [
         "Flexible contract terms",
         "Remote work available",
         "Creative freedom",
         "Competitive hourly rate",
      ],
      companyWebsite: "https://designstudio.com",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   },
];

export async function seedDatabase() {
   try {
      console.log("Starting to seed database...");

      for (const job of sampleJobs) {
         await addDoc(collection(db, "jobs"), job);
         console.log(`Added job: ${job.title} at ${job.company}`);
      }

      console.log("Database seeding completed successfully!");
   } catch (error) {
      console.error("Error seeding database:", error);
      throw error;
   }
}

// Function to call from browser console for testing
export function seedFromConsole() {
   // @ts-ignore - This is for browser console use
   window.seedDatabase = seedDatabase;
   console.log("Call window.seedDatabase() to seed the database");
}
