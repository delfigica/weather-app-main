"use client";
import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useWeather } from "../context/WeatherContext";
import sunnyIcon from "@/assets/images/icon-sunny.webp";
import drizzleIcon from "@/assets/images/icon-drizzle.webp";
import rainIcon from "@/assets/images/icon-rain.webp";
import snowIcon from "@/assets/images/icon-snow.webp";
import stormIcon from "@/assets/images/icon-storm.webp";
import overcastIcon from "@/assets/images/icon-overcast.webp";
import fogIcon from "@/assets/images/icon-fog.webp";

const getIcon = (code) => {
  if ([0].includes(code)) return sunnyIcon;
  if ([1, 2, 3].includes(code)) return overcastIcon;
  if ([45, 48].includes(code)) return fogIcon;
  if ([51, 53, 55, 56, 57].includes(code)) return drizzleIcon;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return rainIcon;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return snowIcon;
  if ([95, 96, 99].includes(code)) return stormIcon;
  return overcastIcon;
};

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
                borderRadius: "8px",
                padding: "10px 12px",
                height: "145px",
                border: "1px solid hsla(240, 5.90%, 70.00%, 0.28)",
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
                  <Image
                    src={getIcon(item.weatherCode)}
                    alt="weather icon"
                    width={50}
                    height={50}
                  />
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
