import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

export const ColorModeContext = createContext({
  mode: "light",
  setMode: (mode: "light" | "dark") => {},
});

export const useColorModeContext = () => {
  return useContext(ColorModeContext);
};

interface ColorModeContextProps {
  children: ReactNode;
}

export function ColorModeProvider({ children }: ColorModeContextProps) {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? (savedMode as "light" | "dark") : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        ...customTheme,
        palette: { mode },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorModeContext.Provider value={{ mode, setMode }}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}

export const customTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Raleway"',
      '"Helvetica Neue"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});