"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Container, ThemeProvider } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { theme } from "@/Style";
import { Search } from "./components/Search";
import { WeatherProvider } from "./context/WeatherContext";
import { UnitsProvider } from "./context/UnitsContext";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "hsl(243, 96%, 9%)",
          minHeight: "100vh",
        }}
      >
        <Container>
          <UnitsProvider>
            <WeatherProvider>
              <Navbar />
              <Search />
            </WeatherProvider>
          </UnitsProvider>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
