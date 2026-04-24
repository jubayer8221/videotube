import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { fetchFreeVideos } from "../services/videoApi";

export interface VideoEntity {
  id: string;
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

export interface CommentEntity {
  id: string;
  videoId: string;
  author: string;
  content: string;
  likes: number;
}

export interface SuggestionEntity {
  id: string;
  query: string;
  lastUsed: string;
}

const videosAdapter = createEntityAdapter<VideoEntity>();
const commentsAdapter = createEntityAdapter<CommentEntity>();
const suggestionsAdapter = createEntityAdapter<SuggestionEntity>();

const initialVideos = videosAdapter.setAll(videosAdapter.getInitialState(), [
  {
    id: nanoid(),
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
    id: nanoid(),
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
    id: nanoid(),
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
]);

const initialComments = commentsAdapter.setAll(
  commentsAdapter.getInitialState(),
  [
    {
      id: nanoid(),
      videoId: initialVideos.ids[0] as string,
      author: "VideoTube Editor",
      content: "This is a great example of a theme-first video experience.",
      likes: 120,
    },
  ],
);

const initialSuggestions = suggestionsAdapter.setAll(
  suggestionsAdapter.getInitialState(),
  [
    { id: nanoid(), query: "AI video editor", lastUsed: "2026-04-24" },
    { id: nanoid(), query: "glassmorphism UI", lastUsed: "2026-04-23" },
  ],
);

export interface VideoState {
  videos: ReturnType<typeof videosAdapter.getInitialState>;
  comments: ReturnType<typeof commentsAdapter.getInitialState>;
  suggestions: ReturnType<typeof suggestionsAdapter.getInitialState>;
  searchQuery: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VideoState = {
  videos: initialVideos,
  comments: initialComments,
  suggestions: initialSuggestions,
  searchQuery: "",
  status: "idle",
  error: null,
};

export const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
  const response = await fetchFreeVideos();
  return response;
});

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    addVideo: {
      reducer(state, action) {
        videosAdapter.addOne(state.videos, action.payload);
      },
      prepare(video: Omit<VideoEntity, "id">) {
        return {
          payload: { id: nanoid(), ...video },
          meta: undefined,
          error: undefined,
        };
      },
    },
    addComment: {
      reducer(state, action) {
        commentsAdapter.addOne(state.comments, action.payload);
      },
      prepare(comment: Omit<CommentEntity, "id">) {
        return {
          payload: { id: nanoid(), ...comment },
          meta: undefined,
          error: undefined,
        };
      },
    },
    addSuggestion: {
      reducer(state, action) {
        suggestionsAdapter.addOne(state.suggestions, action.payload);
      },
      prepare(suggestion: Omit<SuggestionEntity, "id">) {
        return {
          payload: { id: nanoid(), ...suggestion },
          meta: undefined,
          error: undefined,
        };
      },
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        videosAdapter.setAll(
          state.videos,
          action.payload.map((video) => ({ id: nanoid(), ...video })),
        );
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unable to load videos";
      });
  },
});

const videoAdapterSelectors = videosAdapter.getSelectors<VideoState>(
  (state) => state.videos,
);
const suggestionSelectors = suggestionsAdapter.getSelectors<VideoState>(
  (state) => state.suggestions,
);
const commentSelectors = commentsAdapter.getSelectors<VideoState>(
  (state) => state.comments,
);

export const videoSelectors = {
  selectAllVideos: videoAdapterSelectors.selectAll,
  selectVideoById: videoAdapterSelectors.selectById,
  selectSuggestions: suggestionSelectors.selectAll,
  selectComments: commentSelectors.selectAll,
  selectSearchQuery: (state: VideoState) => state.searchQuery,
};

export const { addVideo, addComment, addSuggestion, setSearchQuery } =
  videoSlice.actions;
export default videoSlice.reducer;
