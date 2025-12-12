"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Container, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { theme } from "@/Style";
import { Search } from "./components/Search";
import { WeatherProvider } from "./context/WeatherContext";
import { UnitsProvider } from "./context/UnitsContext";
import { CountryBox } from "./components/CountryBox";

export default function Home() {
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));
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
              <Box sx={laptop ? { display: "flex" } : {display: 'flex', flexDirection: 'column'}}>
                <Box sx={laptop ? { width: "60%" } : {width: '100%'}}>
                  <CountryBox />
                </Box>
                <Box sx={laptop ? { width: "40%" } : {width: '100%'}}></Box>
              </Box>
            </WeatherProvider>
          </UnitsProvider>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
