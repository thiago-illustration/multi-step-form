import { PropsWithChildren } from "react";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({});

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);
