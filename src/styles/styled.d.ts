import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      danger: string;
      success: string;
      successSoft: string;
      primarySoft: string;
      dangerSoft: string;
      background: string;
      shadowDark: string;
      background2: string;
      surface: string;
      text: string;
      border: string;
    };
  }
}
