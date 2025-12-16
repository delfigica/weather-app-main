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

export const btnStyle = {
  borderRadius: "10px",
  textTransform: "capitalize",
  padding: "10px 15px",
  backgroundColor: "hsl(243, 27%, 20%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const activeBtn = {
  ...btnStyle,
  border: "2px solid hsl(0, 0%, 100%)",
};
