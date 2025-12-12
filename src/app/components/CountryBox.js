import React from "react";
import { useWeather } from "../context/WeatherContext";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import bgTodayLarge from "@/assets/images/bg-today-large.svg";
import bgTodaySmall from "@/assets/images/bg-today-small.svg";

//IMAGES
import drizzle from "@/assets/images/icon-drizzle.webp";
import fog from "@/assets/images/icon-fog.webp";
import overcast from "@/assets/images/icon-overcast.webp";
import partlyCloudy from "@/assets/images/icon-partly-cloudy.webp";
import rain from "@/assets/images/icon-rain.webp";
import snow from "@/assets/images/icon-snow.webp";
import sunny from "@/assets/images/icon-sunny.webp";
import storm from "@/assets/images/icon-storm.webp";
import Image from "next/image";

export const CountryBox = () => {
  const { weather } = useWeather();

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getIcon = (code) => {
    // WMO codes grouped by conditions
    if ([0].includes(code)) return sunny;
    if ([1, 2, 3].includes(code)) return overcast;
    if ([45, 48].includes(code)) return fog;
    if ([51, 53, 55, 56, 57].includes(code)) return drizzle;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return rain;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return snowIcon;
    if ([95, 96, 99].includes(code)) return storm;
    return overcast;
  };

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
              margin: '30px 0px'
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
                width: '100%'
              }
        }
      >
        <Box sx={{ margin: "0 10px" }}>
          <Image
            width={laptop ? 70 : 150}
            height={laptop ? 70 : 150}
            src={getIcon(weather?.weatherCode)}
            alt="weather icon"
          />
        </Box>
        <Typography sx={laptop ? { fontSize: "5em" } : { fontSize: "6em" }}>
          {weather?.temperature}°
        </Typography>
      </Box>
    </Box>
  );
};
