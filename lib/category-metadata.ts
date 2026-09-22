export const EVENT_CATEGORIES = [
  {
    slug: "hackathon",
    title: "Hackathons",
    description: "Innovation challenges and coding competitions where participants build solutions under time pressure.",
    icon: "Code",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
  },
  {
    slug: "team-collab",
    title: "Team Collab",
    description: "Collaborative events bringing different disciplines together to foster teamwork and creativity.",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800"
  },
  {
    slug: "seminar",
    title: "Seminars",
    description: "Expert talks and guest lectures providing industry insights and academic knowledge.",
    icon: "Presentation",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800"
  },
  {
    slug: "workshop",
    title: "Workshops",
    description: "Hands-on technical sessions focused on practical skills and technology stacks.",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
  }
];

export function getCategoryBySlug(slug: string) {
  return EVENT_CATEGORIES.find(cat => cat.slug === slug);
}
