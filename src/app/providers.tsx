"use client";
import { Provider } from "react-redux";
import { store } from "@store/store";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import theme from "@styles/tokens";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
