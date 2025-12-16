"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useWeather } from "../context/WeatherContext";

export const DailyForecast = () => {
  const { weather } = useWeather();

  const days = weather?.dailyTemps?.slice(0, 7) || [];

  if (!days.length) {
    return null;
  }

  return (
    <Box
      sx={{
        marginTop: "16px",
        backgroundColor: "hsl(243, 23%, 24%)",
        border: "1px solid hsl(243, 23%, 30%)",
        borderRadius: "10px",
        padding: "12px 14px",
        color: "hsl(0, 0%, 100%)",
      }}
    >
      <Typography sx={{ fontSize: "1.1em", fontWeight: "600", mb: 1 }}>
        7-day forecast
      </Typography>
      <Box sx={{ display: "grid", gap: "8px" }}>
        {days.map((item) => (
          <Box
            key={item.time}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "hsl(243, 27%, 20%)",
              borderRadius: "8px",
              padding: "10px 12px",
            }}
          >
            <Typography sx={{ fontSize: ".95em" }}>
              {new Date(item.time).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Typography sx={{ fontWeight: "700" }}>
              {item.max}° / {item.min}°
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
