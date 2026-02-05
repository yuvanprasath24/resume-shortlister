// Mock data store for the Resume Filtering System
// In a real app, this would be connected to a database

export interface User {
  id: string
  email: string
  name: string
  company: string
  role: "admin" | "recruiter"
}

export interface Skill {
  name: string
  weight: number
}

export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract" | "remote"
  requiredSkills: Skill[]
  description: string
  minExperience: number
  education: string
  createdAt: string
  status: "active" | "paused" | "closed"
  candidateCount: number
}

export interface Candidate {
  id: string
  jobId: string
  name: string
  email: string
  phone: string
  location: string
  resumeUrl: string
  matchScore: number
  aiConfidence: number
  skills: { name: string; matched: boolean; yearsOfExperience?: number }[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  projects: {
    name: string
    description: string
    technologies: string[]
  }[]
  skillGaps: string[]
  whyThisCandidate: string
  isDuplicate: boolean
  duplicateOf?: string
  status: "new" | "reviewed" | "shortlisted" | "rejected" | "interviewed"
  appliedAt: string
}

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "full-time",
    requiredSkills: [
      { name: "React", weight: 30 },
      { name: "TypeScript", weight: 25 },
      { name: "Next.js", weight: 20 },
      { name: "Tailwind CSS", weight: 15 },
      { name: "GraphQL", weight: 10 },
    ],
    description: "We are looking for a Senior Frontend Developer to join our team and help build the next generation of our product.",
    minExperience: 5,
    education: "Bachelor's in Computer Science or related field",
    createdAt: "2024-01-15",
    status: "active",
    candidateCount: 47,
  },
  {
    id: "job-2",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "remote",
    requiredSkills: [
      { name: "Product Strategy", weight: 30 },
      { name: "Agile/Scrum", weight: 25 },
      { name: "Data Analysis", weight: 20 },
      { name: "User Research", weight: 15 },
      { name: "Roadmapping", weight: 10 },
    ],
    description: "Join us as a Product Manager to drive our product vision and strategy.",
    minExperience: 4,
    education: "Bachelor's degree required, MBA preferred",
    createdAt: "2024-01-20",
    status: "active",
    candidateCount: 32,
  },
  {
    id: "job-3",
    title: "Data Scientist",
    department: "Data",
    location: "New York, NY",
    type: "full-time",
    requiredSkills: [
      { name: "Python", weight: 30 },
      { name: "Machine Learning", weight: 25 },
      { name: "SQL", weight: 20 },
      { name: "TensorFlow", weight: 15 },
      { name: "Statistics", weight: 10 },
    ],
    description: "We need a Data Scientist to help us unlock insights from our data.",
    minExperience: 3,
    education: "Master's in Data Science, Statistics, or related field",
    createdAt: "2024-01-10",
    status: "active",
    candidateCount: 28,
  },
  {
    id: "job-4",
    title: "UX Designer",
    department: "Design",
    location: "Austin, TX",
    type: "full-time",
    requiredSkills: [
      { name: "Figma", weight: 30 },
      { name: "User Research", weight: 25 },
      { name: "Prototyping", weight: 20 },
      { name: "Design Systems", weight: 15 },
      { name: "Accessibility", weight: 10 },
    ],
    description: "Create beautiful, intuitive experiences for our users.",
    minExperience: 4,
    education: "Bachelor's in Design or related field",
    createdAt: "2024-01-18",
    status: "paused",
    candidateCount: 15,
  },
]

// Mock Candidates Data
export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    jobId: "job-1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    resumeUrl: "/resumes/sarah-chen.pdf",
    matchScore: 94,
    aiConfidence: 92,
    skills: [
      { name: "React", matched: true, yearsOfExperience: 6 },
      { name: "TypeScript", matched: true, yearsOfExperience: 5 },
      { name: "Next.js", matched: true, yearsOfExperience: 4 },
      { name: "Tailwind CSS", matched: true, yearsOfExperience: 3 },
      { name: "GraphQL", matched: true, yearsOfExperience: 3 },
      { name: "Node.js", matched: false, yearsOfExperience: 4 },
    ],
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "TechCorp Inc.",
        duration: "2021 - Present",
        description: "Led frontend development for enterprise SaaS platform serving 500k+ users.",
      },
      {
        title: "Frontend Developer",
        company: "StartupXYZ",
        duration: "2018 - 2021",
        description: "Built and maintained React applications with TypeScript.",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        year: "2018",
      },
    ],
    projects: [
      {
        name: "Design System Library",
        description: "Created a comprehensive design system used across 5 products.",
        technologies: ["React", "TypeScript", "Storybook"],
      },
    ],
    skillGaps: [],
    whyThisCandidate: "Sarah is an exceptional match with 6+ years of React experience and strong expertise in all required skills. Her background in enterprise SaaS development and design systems aligns perfectly with this role. She has demonstrated leadership in frontend architecture decisions.",
    isDuplicate: false,
    status: "shortlisted",
    appliedAt: "2024-01-16",
  },
  {
    id: "cand-2",
    jobId: "job-1",
    name: "Michael Rodriguez",
    email: "m.rodriguez@email.com",
    phone: "+1 (555) 234-5678",
    location: "Austin, TX",
    resumeUrl: "/resumes/michael-rodriguez.pdf",
    matchScore: 87,
    aiConfidence: 89,
    skills: [
      { name: "React", matched: true, yearsOfExperience: 5 },
      { name: "TypeScript", matched: true, yearsOfExperience: 4 },
      { name: "Next.js", matched: true, yearsOfExperience: 2 },
      { name: "Tailwind CSS", matched: true, yearsOfExperience: 2 },
      { name: "GraphQL", matched: false },
      { name: "Vue.js", matched: false, yearsOfExperience: 3 },
    ],
    experience: [
      {
        title: "Frontend Developer",
        company: "Digital Agency Co.",
        duration: "2019 - Present",
        description: "Developed responsive web applications for Fortune 500 clients.",
      },
    ],
    education: [
      {
        degree: "B.S. Information Technology",
        institution: "University of Texas",
        year: "2019",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce solution with real-time inventory.",
        technologies: ["React", "Node.js", "MongoDB"],
      },
    ],
    skillGaps: ["GraphQL experience"],
    whyThisCandidate: "Michael has solid React and TypeScript experience with a good foundation in Next.js. While he lacks GraphQL experience, his quick learning ability and diverse project portfolio suggest he would adapt quickly. Strong client-facing experience is a plus.",
    isDuplicate: false,
    status: "reviewed",
    appliedAt: "2024-01-17",
  },
  {
    id: "cand-3",
    jobId: "job-1",
    name: "Emily Watson",
    email: "emily.watson@email.com",
    phone: "+1 (555) 345-6789",
    location: "Seattle, WA",
    resumeUrl: "/resumes/emily-watson.pdf",
    matchScore: 82,
    aiConfidence: 85,
    skills: [
      { name: "React", matched: true, yearsOfExperience: 4 },
      { name: "TypeScript", matched: true, yearsOfExperience: 3 },
      { name: "Next.js", matched: false },
      { name: "Tailwind CSS", matched: true, yearsOfExperience: 2 },
      { name: "GraphQL", matched: true, yearsOfExperience: 2 },
    ],
    experience: [
      {
        title: "Software Engineer",
        company: "CloudTech Solutions",
        duration: "2020 - Present",
        description: "Full-stack development with focus on frontend architecture.",
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        institution: "University of Washington",
        year: "2020",
      },
    ],
    projects: [
      {
        name: "Real-time Dashboard",
        description: "Built analytics dashboard with WebSocket integration.",
        technologies: ["React", "GraphQL", "D3.js"],
      },
    ],
    skillGaps: ["Next.js experience"],
    whyThisCandidate: "Emily brings strong fundamentals with a Master's degree and experience in GraphQL. Her real-time dashboard project demonstrates advanced frontend skills. Next.js can be quickly learned given her React expertise.",
    isDuplicate: false,
    status: "new",
    appliedAt: "2024-01-18",
  },
  {
    id: "cand-4",
    jobId: "job-1",
    name: "James Kim",
    email: "james.k@email.com",
    phone: "+1 (555) 456-7890",
    location: "Los Angeles, CA",
    resumeUrl: "/resumes/james-kim.pdf",
    matchScore: 76,
    aiConfidence: 78,
    skills: [
      { name: "React", matched: true, yearsOfExperience: 3 },
      { name: "TypeScript", matched: true, yearsOfExperience: 2 },
      { name: "Next.js", matched: false },
      { name: "Tailwind CSS", matched: false },
      { name: "GraphQL", matched: false },
      { name: "CSS/SCSS", matched: false, yearsOfExperience: 4 },
    ],
    experience: [
      {
        title: "Junior Frontend Developer",
        company: "WebDev Studio",
        duration: "2021 - Present",
        description: "Developed and maintained client websites and web applications.",
      },
    ],
    education: [
      {
        degree: "B.A. Computer Science",
        institution: "UCLA",
        year: "2021",
      },
    ],
    projects: [],
    skillGaps: ["Next.js", "Tailwind CSS", "GraphQL"],
    whyThisCandidate: "James shows promise with solid React fundamentals but lacks experience in several key required technologies. Would require significant training investment. Consider for junior roles instead.",
    isDuplicate: false,
    status: "new",
    appliedAt: "2024-01-19",
  },
  {
    id: "cand-5",
    jobId: "job-1",
    name: "Sarah Chen",
    email: "s.chen.work@email.com",
    phone: "+1 (555) 999-8888",
    location: "San Francisco, CA",
    resumeUrl: "/resumes/sarah-chen-2.pdf",
    matchScore: 94,
    aiConfidence: 92,
    skills: [
      { name: "React", matched: true, yearsOfExperience: 6 },
      { name: "TypeScript", matched: true, yearsOfExperience: 5 },
      { name: "Next.js", matched: true, yearsOfExperience: 4 },
      { name: "Tailwind CSS", matched: true, yearsOfExperience: 3 },
      { name: "GraphQL", matched: true, yearsOfExperience: 3 },
    ],
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "TechCorp Inc.",
        duration: "2021 - Present",
        description: "Led frontend development for enterprise SaaS platform.",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        year: "2018",
      },
    ],
    projects: [],
    skillGaps: [],
    whyThisCandidate: "Duplicate profile detected. This appears to be the same candidate as Sarah Chen (cand-1) with a different email address.",
    isDuplicate: true,
    duplicateOf: "cand-1",
    status: "new",
    appliedAt: "2024-01-20",
  },
  {
    id: "cand-6",
    jobId: "job-2",
    name: "Alexandra Foster",
    email: "alex.foster@email.com",
    phone: "+1 (555) 567-8901",
    location: "Chicago, IL",
    resumeUrl: "/resumes/alexandra-foster.pdf",
    matchScore: 91,
    aiConfidence: 88,
    skills: [
      { name: "Product Strategy", matched: true, yearsOfExperience: 5 },
      { name: "Agile/Scrum", matched: true, yearsOfExperience: 6 },
      { name: "Data Analysis", matched: true, yearsOfExperience: 4 },
      { name: "User Research", matched: true, yearsOfExperience: 3 },
      { name: "Roadmapping", matched: true, yearsOfExperience: 4 },
    ],
    experience: [
      {
        title: "Senior Product Manager",
        company: "SaaS Startup",
        duration: "2020 - Present",
        description: "Led product strategy for B2B platform with $10M ARR.",
      },
    ],
    education: [
      {
        degree: "MBA",
        institution: "Northwestern Kellogg",
        year: "2020",
      },
    ],
    projects: [
      {
        name: "Product-Led Growth Initiative",
        description: "Implemented PLG strategy that increased conversion by 40%.",
        technologies: ["Amplitude", "Mixpanel", "Segment"],
      },
    ],
    skillGaps: [],
    whyThisCandidate: "Alexandra is an excellent fit with comprehensive product management experience across all required skills. Her MBA from Kellogg and success with PLG initiatives demonstrate strategic thinking and execution ability.",
    isDuplicate: false,
    status: "shortlisted",
    appliedAt: "2024-01-21",
  },
]

// Analytics data
export const analyticsData = {
  totalCandidates: 122,
  shortlisted: 18,
  interviewed: 8,
  averageMatchScore: 76,
  processingTime: "2.3s",
  accuracyRate: 94,
}
