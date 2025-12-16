import { createTheme } from "@mui/material";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const themeApp = createTheme({
  typography: {
    fontFamily: dmSans.style.fontFamily,
  },
  palette: {
    primary: {
      main: "hsl(243, 27%, 20%)",
    },
  },
});
