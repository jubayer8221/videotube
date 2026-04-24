import type { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTokens {
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

  interface Theme {
    customTokens: CustomTokens;
  }

  interface ThemeOptions {
    customTokens?: Partial<CustomTokens>;
  }
}
