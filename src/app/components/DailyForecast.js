"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useWeather } from "../context/WeatherContext";
import { WeatherIcon } from "./WeatherIcon";

export const DailyForecast = () => {
  const { weather } = useWeather();
  const days = weather?.dailyTemps?.slice(0, 7) || [];

  if (!days.length) return null;

  return (
    <Box
      sx={{
        marginTop: "16px",
        color: "hsl(0, 0%, 100%)",
      }}
    >
      <Typography sx={{ fontSize: "1.1em", fontWeight: "600", mb: 1 }}>
        Daily forecast
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {days.map((item) => {
          const date = new Date(item.time);
          const dayLabel = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          return (
            <Box
              key={item.time}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "hsl(243, 27%, 20%)",
                border: "1px solid hsla(240, 5.90%, 70.00%, 0.28)",
                borderRadius: "8px",
                padding: "10px 12px",
                height: "145px",
                width: "95px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    minWidth: "50px",
                    textAlign: "center",
                    borderRadius: "8px",
                    padding: "6px 8px",
                    fontWeight: 500,
                  }}
                >
                  {dayLabel}
                </Box>
                {item.weatherCode !== undefined && (
                  <WeatherIcon code={item.weatherCode} size={50} />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: '100%'
                }}
              >
                <Typography sx={{ color: "hsl(0, 0%, 100%)" }}>
                  {Math.round(item.max)}°
                </Typography>
                <Typography sx={{ color: "hsl(240, 6%, 70%)" }}>
                  {Math.round(item.min)}°
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
