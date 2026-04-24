import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  themeConfig,
  ThemeStyle,
  VideoTubeCustomTokens,
} from "../theme/themeConfig";

interface ThemeState {
  selectedTheme: ThemeStyle;
  themeTokens: VideoTubeCustomTokens;
}

const initialTheme = themeConfig.default;

const initialState: ThemeState = {
  selectedTheme: "default",
  themeTokens: initialTheme.tokens,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeStyle>) {
      const config = themeConfig[action.payload];
      state.selectedTheme = action.payload;
      state.themeTokens = config.tokens;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
