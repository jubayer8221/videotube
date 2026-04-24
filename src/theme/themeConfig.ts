import { createTheme, ThemeOptions } from "@mui/material/styles";

export type ThemeStyle = "default" | "glassmorphism" | "brutalist";

export interface VideoTubeCustomTokens {
  primary: string;
  secondary: string;
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  blur: string;
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
  fontFamily: string;
  surfaceOpacity: number;
}

export interface VideoTubeThemeConfig {
  name: string;
  palette: {
    primary: string;
    secondary: string;
    surface: string;
    background: string;
    text: string;
  };
  tokens: VideoTubeCustomTokens;
}

const themeConfigJson: Record<ThemeStyle, VideoTubeThemeConfig> = {
  default: {
    name: "Default",
    palette: {
      primary: "#1976d2",
      secondary: "#9c27b0",
      surface: "#111827",
      background: "#0f172a",
      text: "#f8fafc",
    },
    tokens: {
      primary: "#1976d2",
      secondary: "#9c27b0",
      radius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      blur: "18px",
      shadow: {
        sm: "0 10px 24px rgba(0, 0, 0, 0.14)",
        md: "0 18px 40px rgba(0, 0, 0, 0.18)",
        lg: "0 28px 64px rgba(0, 0, 0, 0.24)",
      },
      fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
      surfaceOpacity: 0.92,
    },
  },
  glassmorphism: {
    name: "Glassmorphism",
    palette: {
      primary: "#4f46e5",
      secondary: "#0ea5e9",
      surface: "#111827",
      background: "#041a37",
      text: "#e2e8f0",
    },
    tokens: {
      primary: "#4f46e5",
      secondary: "#0ea5e9",
      radius: {
        sm: "12px",
        md: "24px",
        lg: "32px",
        xl: "40px",
      },
      blur: "26px",
      shadow: {
        sm: "0 14px 32px rgba(15, 23, 42, 0.28)",
        md: "0 22px 48px rgba(15, 23, 42, 0.34)",
        lg: "0 34px 72px rgba(15, 23, 42, 0.42)",
      },
      fontFamily: "Inter, system-ui, sans-serif",
      surfaceOpacity: 0.58,
    },
  },
  brutalist: {
    name: "Brutalist",
    palette: {
      primary: "#ff4b5c",
      secondary: "#ffc300",
      surface: "#ffffff",
      background: "#080808",
      text: "#0f172a",
    },
    tokens: {
      primary: "#ff4b5c",
      secondary: "#ffc300",
      radius: {
        sm: "0px",
        md: "4px",
        lg: "8px",
        xl: "0px",
      },
      blur: "0px",
      shadow: {
        sm: "none",
        md: "8px 8px 0 rgba(0,0,0,0.22)",
        lg: "12px 12px 0 rgba(0,0,0,0.3)",
      },
      fontFamily: "Courier New, Courier, monospace",
      surfaceOpacity: 1,
    },
  },
};

const hexToRgb = (value: string) => {
  const hex = value.replace("#", "");
  const parsed =
    hex.length === 3
      ? hex
          .split("")
          .map((symbol) => symbol + symbol)
          .join("")
      : hex;

  const numeric = parseInt(parsed, 16);
  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;

  return `${r}, ${g}, ${b}`;
};

const buildThemeOptions = (config: VideoTubeThemeConfig): ThemeOptions => ({
  palette: {
    mode: "dark",
    primary: { main: config.palette.primary },
    secondary: { main: config.palette.secondary },
    background: {
      default: config.palette.background,
      paper: config.palette.surface,
    },
    text: {
      primary: config.palette.text,
    },
  },
  typography: {
    fontFamily: config.tokens.fontFamily,
  },
  shape: {
    borderRadius: Number(config.tokens.radius.lg.replace("px", "")) || 0,
  },
  customTokens: config.tokens,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: `rgba(${hexToRgb(config.palette.surface)}, ${config.tokens.surfaceOpacity})`,
          backdropFilter: `blur(${config.tokens.blur})`,
        },
      },
    },
  },
});

export const themeConfig = themeConfigJson;

export const getThemeNames = (): ThemeStyle[] =>
  Object.keys(themeConfigJson) as ThemeStyle[];

export const createVideoTubeTheme = (themeName: ThemeStyle) =>
  createTheme(buildThemeOptions(themeConfigJson[themeName]));
