"use client";
import React, { useMemo, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { WeatherIcon } from "./WeatherIcon";
import Image from "next/image";
import { btnStyle } from "@/Style";
import { Box, Typography, Button } from "@mui/material";
import dropdown from "@/assets/images/icon-dropdown.svg";

const formatDayLabel = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
  });

export const HourlyForecast = () => {
  const { weather } = useWeather();

  const hourly = weather?.hourlyTemps || [];

  const dayKeys = useMemo(() => {
    const keys = new Set();
    hourly.forEach((item) => {
      if (!item?.time) return;
      const key = new Date(item.time).toISOString().slice(0, 10);
      keys.add(key);
    });
    return Array.from(keys);
  }, [hourly]);

  const [selectedDay, setSelectedDay] = useState(dayKeys[0] || "");
  const [showMenu, setShowMenu] = useState(false);

  if (!hourly.length) return null;

  const filtered = hourly.filter((item) => {
    if (!item?.time || !selectedDay) return false;
    return new Date(item.time).toISOString().startsWith(selectedDay);
  });

  return (
    <Box
      sx={{
        backgroundColor: "hsl(243, 23%, 24%)",
        borderRadius: "15px",
        color: "hsl(0, 0%, 100%)",
        height: "94vh",
        marginLeft: "30px",
      }}
    >
      <Box
        className="hourly-forecast"
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          width: "100%",
          padding: "1em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <Typography sx={{ fontSize: "1em", fontWeight: "500" }}>
            Hourly forecast
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowMenu((prev) => !prev)}
            sx={{
              ...btnStyle,
              padding: ".5em",
              width: "120px",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>
              {selectedDay ? formatDayLabel(selectedDay) : "Select day"}
            </Typography>
            <Image src={dropdown} width={12} height={12} alt="settings" />
          </Button>
          {showMenu && (
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 6px)",
                backgroundColor: "hsl(243, 27%, 20%)",
                border: "1px solid hsl(243, 23%, 30%)",
                borderRadius: "10px",
                padding: "8px",
                zIndex: 10,
                minWidth: "180px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              {dayKeys.map((day) => (
                <Typography
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setShowMenu(false);
                  }}
                  sx={{
                    padding: "8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      day === selectedDay
                        ? "hsl(243, 23%, 30%)"
                        : "transparent",
                    "&:hover": { backgroundColor: "hsl(243, 23%, 34%)" },
                  }}
                >
                  {formatDayLabel(day)}
                </Typography>
              ))}
            </Box>
          )}
        </Box>

        <Box>
          {filtered.map((item) => (
            <Box
              key={item.time}
              sx={{
                backgroundColor: "hsl(243, 23%, 30%)",
                border: "1px solid hsla(240, 5.90%, 70.00%, 0.28)",
                borderRadius: "8px",
                padding: ".5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "15px 0px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {item.weatherCode !== undefined && (
                  <WeatherIcon code={item.weatherCode} size={35} />
                )}
                <Typography sx={{ fontSize: "1em", fontWeight: "500" }}>
                  {new Date(item.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: "300", fontSize: "1em" }}>
                  {item.temperature}°
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
