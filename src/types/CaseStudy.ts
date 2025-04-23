export interface CaseStudy {
  id?: string;
  userId: string;
  username: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  overview: string;
  isPublished: boolean;
  portfolioStyle?: "designer" | "developer" | "writer";

  // Media gallery
  gallery: MediaItem[];

  // Development process timeline
  timeline: TimelineItem[];

  // Tools and technologies
  tools: string[];

  // Outcomes
  outcomes: {
    metrics: string[];
    testimonials: TestimonialItem[];
  };

  createdAt?: any; // Firestore timestamp
  updatedAt?: any; // Firestore timestamp
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
  order: number;
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  order: number;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  position?: string;
  company?: string;
}
