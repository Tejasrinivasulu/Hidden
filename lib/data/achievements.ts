export type AchievementCategory = "Award" | "Hackathon" | "Competition" | "Research" | "Project" | "Certification" | "Workshop" | "Leadership";

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  category: AchievementCategory;
  date: string;
  year: string;
  description: string;
  featured: boolean;
  images: string[];
  teamMembers: string[];
  teamName: string;
  fullStory?: string;
}

export const statisticsData = {
  totalAchievements: 120,
  awardsWon: 45,
  studentsRecognized: 350,
  projectsShowcased: 85,
  nationalLevel: 30,
};

export const achievementsData: Achievement[] = [
  {
    id: "1",
    slug: "national-hackathon-winner-2025",
    title: "National Hackathon Winner 2025",
    category: "Hackathon",
    date: "March 2025",
    year: "2025",
    description: "Team Innovators secured 1st Place among 500+ teams from across India for developing an AI-powered Agricultural Intelligence Platform.",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop"
    ],
    teamMembers: ["Ramesh Manikala", "Priya Sharma", "Rahul Verma"],
    teamName: "Team Innovators",
    fullStory: "During the 48-hour National Hackathon, our team built an innovative platform using advanced Machine Learning algorithms to predict crop yields and recommend optimal harvesting times. The solution stood out for its accuracy and practical applicability, ultimately winning the grand prize and a chance to pilot the project with leading agricultural firms."
  },
  {
    id: "2",
    slug: "ai-innovation-challenge-winner",
    title: "AI Innovation Challenge Winner",
    category: "Project",
    date: "January 2025",
    year: "2025",
    description: "Secured 1st place for developing a smart agricultural prediction platform using Machine Learning.",
    featured: false,
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop"],
    teamMembers: ["Anita Desai", "Vikram Singh"],
    teamName: "Web Development Team",
    fullStory: "The AI Innovation Challenge brought together the brightest minds in the university. Our team focused on solving real-world problems in the agricultural sector, deploying a scalable application architecture that impressed the judges."
  },
  {
    id: "3",
    slug: "best-technical-project-award",
    title: "Best Technical Project Award",
    category: "Award",
    date: "December 2024",
    year: "2024",
    description: "Awarded for AgriPredict, an AI-powered agricultural intelligence platform.",
    featured: false,
    images: ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1740&auto=format&fit=crop"],
    teamMembers: ["Ramesh Manikala"],
    teamName: "Solo Developer",
    fullStory: "AgriPredict was recognized as the Best Technical Project of the year during the annual tech symposium. The project demonstrated exceptional use of cloud technologies and responsive web design."
  },
  {
    id: "4",
    slug: "international-research-symposium",
    title: "International Research Symposium Presentation",
    category: "Research",
    date: "November 2024",
    year: "2024",
    description: "Published and presented a paper on sustainable computing at the IRS 2024.",
    featured: false,
    images: ["https://images.unsplash.com/photo-1558021211-6d1403321394?q=80&w=1740&auto=format&fit=crop"],
    teamMembers: ["Dr. K. Rao", "Ramesh Manikala"],
    teamName: "ISTE Research Wing",
    fullStory: "Our research on sustainable computing models and their impact on reducing carbon footprints in data centers was well received. The presentation sparked engaging discussions with international delegates."
  },
  {
    id: "5",
    slug: "cloud-architect-certification",
    title: "AWS Certified Solutions Architect",
    category: "Certification",
    date: "October 2024",
    year: "2024",
    description: "15 members successfully completed the rigorous AWS certification, enhancing our cloud capabilities.",
    featured: false,
    images: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1740&auto=format&fit=crop"],
    teamMembers: ["ISTE Cloud Team"],
    teamName: "Cloud Computing SIG",
    fullStory: "Following a semester-long study group organized by ISTE, 15 students cleared the AWS Solutions Architect exam, demonstrating our commitment to industry-standard certifications."
  }
];
