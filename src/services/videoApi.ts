export interface VideoApiVideo {
  title: string;
  channel: string;
  views: string;
  uploaded: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  category: string;
  likes: string;
}

const freeVideos: VideoApiVideo[] = [
  {
    title: "AI-Powered UX in a Glassmorphism Interface",
    channel: "VideoTube Labs",
    views: "1.2M views",
    uploaded: "2 days ago",
    duration: "00:48",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "A modern shorts feed with gesture controls, instant insights, and next-gen discovery.",
    category: "AI & Design",
    likes: "94K",
  },
  {
    title: "Brutalist UX Patterns for High Contrast Experiences",
    channel: "VideoTube Studio",
    views: "860K views",
    uploaded: "4 days ago",
    duration: "4:12",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Learn how to build video-first interfaces using brutalist tokens and contrast-first styling.",
    category: "Design Systems",
    likes: "81K",
  },
  {
    title: "Responsive Video Experiences on Mobile & Desktop",
    channel: "VideoTube Premium",
    views: "430K views",
    uploaded: "1 week ago",
    duration: "7:58",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description:
      "A walkthrough of performance optimized layouts, responsive video cards, and modern page flows.",
    category: "Mobile UX",
    likes: "56K",
  },
];

export const fetchFreeVideos = async (): Promise<VideoApiVideo[]> =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(freeVideos), 450);
  });
