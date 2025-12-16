'use client'
import React from "react";
import { useWeather } from "../context/WeatherContext";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import bgTodayLarge from "@/assets/images/bg-today-large.svg";
import bgTodaySmall from "@/assets/images/bg-today-small.svg";
import { WeatherIcon } from "./WeatherIcon";

export const CountryBox = () => {
  const { weather } = useWeather();

  if (!weather) {
    return null;
  }

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={
        laptop
          ? {
              backgroundImage: `url(${
                bgTodayLarge?.src || "/images/bg-today-large.svg"
              })`,
              backgroundColor: "hsl(233, 67%, 56%)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100%",
              width: "100%",
              height: "230px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "hsl(0, 0%, 100%)",
              padding: "0px 1em",
            }
          : {
              backgroundImage: `url(${
                bgTodaySmall?.src || "/images/bg-today-small.svg"
              })`,
              backgroundColor: "hsl(233, 67%, 56%)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100%",
              width: "100%",
              height: "280px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "hsl(0, 0%, 100%)",
              padding: "4em 1em",
              margin: "30px 0px",
            }
      }
    >
      <Box>
        <Typography sx={{ fontSize: "2em" }}>{weather?.location}</Typography>
        <Typography
          sx={
            laptop
              ? { fontSize: "1em", fontWeight: "light" }
              : { textAlign: "center", margin: "10px 0px" }
          }
        >
          {todayLabel}
        </Typography>
      </Box>
      <Box
        sx={
          laptop
            ? { display: "flex", alignItems: "center" }
            : {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }
        }
      >
        <Box sx={{ margin: "0 10px" }}>
          <WeatherIcon
            code={weather?.weatherCode}
            size={laptop ? 70 : 150}
          />
        </Box>
        <Typography sx={laptop ? { fontSize: "5em" } : { fontSize: "5em" }}>
          {Math.round(weather?.temperature)}°
        </Typography>
      </Box>
    </Box>
  );
};
