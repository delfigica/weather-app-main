'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Box, ThemeProvider } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { theme } from "@/Style";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "hsl(243, 96%, 9%)",
          minHeight: "100vh",
        }}
      >
        <Navbar />
      </Box>
    </ThemeProvider>
  );
}
