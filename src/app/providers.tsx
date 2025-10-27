"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "@store/store";
import GlobalStyles from "@styles/GlobalStyles";
import { theme } from "@styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
