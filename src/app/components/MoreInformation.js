"use client";
import React, { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useUnits } from "../context/UnitsContext";

export const MoreInformation = () => {
  const { weather } = useWeather();
  const { units } = useUnits();

  if (!weather) return null;

  const items = [
    {
      label: "Feels like",
      value: weather?.feelsLike !== undefined ? `${weather.feelsLike}°` : "--",
    },
    {
      label: "Humidity",
      value: weather?.humidity !== undefined ? `${weather.humidity}%` : "--",
    },
    {
      label: "Wind",
      value:
        weather?.windSpeed !== undefined
          ? `${weather.windSpeed} ${units.windSpeed}`
          : "--",
    },
    {
      label: "Precipitation",
      value:
        weather?.precipitation !== undefined
          ? `${weather.precipitation} ${
              units.precipitation === "inches" ? "in" : "mm"
            }`
          : "--",
    },
  ];

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        margin: "20px 0px",
        justifyContent: "space-between",
      }}
    >
      {items.map((item, i) => (
        <Box
          key={i}
          sx={
            laptop
              ? {
                  width: "23%",
                  color: "hsl(0, 0%, 100%)",
                  background: "hsl(243, 23%, 24%)",
                  padding: "0 1em",
                  border: "1px solid hsla(240, 5.90%, 70.00%, 0.28)",
                  borderRadius: "5px",
                  height: "90px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }
              : {
                  width: "48%",
                  color: "hsl(0, 0%, 100%)",
                  background: "hsl(243, 23%, 24%)",
                  padding: "0 1em",
                  border: "1px solid hsla(240, 5.90%, 70.00%, 0.28)",
                  borderRadius: "5px",
                  height: "90px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  margin: "10px 0",
                }
          }
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              color: "hsl(250, 6%, 84%)",
              fontSize: ".9em",
            }}
          >
            {item.label}
          </Typography>
          <Typography sx={{ fontSize: "1.5em", fontWeight: "400" }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
