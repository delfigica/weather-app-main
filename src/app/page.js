"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Container,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Navbar } from "./components/Navbar";
import { themeApp } from "@/Style";
import { Search } from "./components/Search";
import { WeatherProvider } from "./context/WeatherContext";
import { UnitsProvider } from "./context/UnitsContext";
import { CountryBox } from "./components/CountryBox";
import { MoreInformation } from "./components/MoreInformation";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";

export default function Home() {
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <ThemeProvider theme={themeApp}>
      <Box
        sx={{
          backgroundColor: "hsl(243, 96%, 9%)",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ padding: '0px 5em'}}>
          <UnitsProvider>
            <WeatherProvider>
              <Navbar />
              <Search />
              <Box
                sx={
                  laptop
                    ? { display: "flex" }
                    : { display: "flex", flexDirection: "column" }
                }
              >
                <Box
                  sx={
                    laptop
                      ? { width: "61%", minHeight: "60vh" }
                      : { width: "100%" }
                  }
                >
                  <CountryBox />
                  <Box sx={{ margin: "20px 0" }}>
                    <MoreInformation />
                  </Box>
                  <Box sx={{ margin: "40px 0" }}>
                    <DailyForecast />
                  </Box>
                </Box>
                <Box sx={laptop ? { width: "39%" } : { width: "100%" }}>
                  <HourlyForecast />
                </Box>
              </Box>
            </WeatherProvider>
          </UnitsProvider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
