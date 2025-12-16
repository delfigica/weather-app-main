"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWeather } from "../context/WeatherContext";
import { useUnits } from "../context/UnitsContext";

const roundValue = (value) =>
  value === undefined || value === null ? value : Math.round(value);

export const Search = () => {
  const [place, setPlace] = useState("");
  const { weather, setWeather, loading, setLoading, error, setError } =
    useWeather();
  const { units } = useUnits();

  const handleChange = (e) => {
    setPlace(e.target.value);
  };

  const handleSearch = async () => {
    const query = place.trim();
    if (!query) {
      setError("Please enter a place to search");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("Geocoding request failed");
      }

      const geoData = await geoResponse.json();
      const location = geoData?.results?.[0];

      if (!location) {
        throw new Error("Location not found");
      }

      const { latitude, longitude, name, country } = location;
      const params = new URLSearchParams({
        latitude,
        longitude,
        current_weather: "true",
        hourly:
          "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weathercode",
        daily: "temperature_2m_max,temperature_2m_min,weathercode",
        timezone: "auto",
        temperature_unit:
          units.temperature === "fahrenheit" ? "fahrenheit" : "celsius",
        windspeed_unit: units.windSpeed === "mph" ? "mph" : "kmh",
        precipitation_unit:
          units.precipitation === "inches" ? "inch" : "mm",
      });

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`
      );

      if (!weatherResponse.ok) {
        throw new Error("Weather request failed");
      }

      const weatherData = await weatherResponse.json();
      const current = weatherData?.current_weather;
      const hourly = weatherData?.hourly;
      const daily = weatherData?.daily;

      const hourlyTemps =
        hourly?.time?.map((time, index) => ({
          time,
          temperature: roundValue(hourly.temperature_2m?.[index]),
          apparent: roundValue(hourly.apparent_temperature?.[index]),
          humidity: roundValue(hourly.relative_humidity_2m?.[index]),
          precipitation: roundValue(hourly.precipitation?.[index]),
          weatherCode: hourly.weathercode?.[index],
        })) || [];

      const dailyTemps =
        daily?.time?.map((time, index) => ({
          time,
          max: roundValue(daily.temperature_2m_max?.[index]),
          min: roundValue(daily.temperature_2m_min?.[index]),
          weatherCode: daily.weathercode?.[index],
        })) || [];

      const currentHourIndex =
        hourly?.time?.findIndex((t) => t === current?.time) ?? -1;

      setWeather({
        location: `${name}${country ? `, ${country}` : ""}`,
        temperature: roundValue(current?.temperature),
        windSpeed: roundValue(current?.windspeed),
        windDirection: current?.winddirection,
        weatherCode: current?.weathercode,
        hourlyTemps,
        dailyTemps,
        feelsLike:
          currentHourIndex >= 0
            ? roundValue(hourly.apparent_temperature?.[currentHourIndex])
            : undefined,
        humidity:
          currentHourIndex >= 0
            ? roundValue(hourly.relative_humidity_2m?.[currentHourIndex])
            : undefined,
        precipitation:
          currentHourIndex >= 0
            ? roundValue(hourly.precipitation?.[currentHourIndex])
            : undefined,
      });
    } catch (err) {
      setWeather(null);
      setError(err.message || "Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h1"
        sx={
          laptop
            ? {
                color: "hsl(0, 0%, 100%)",
                fontSize: "2.4em",
                fontFamily: "Bricolage Grotesque",
              }
            : {
                color: "hsl(0, 0%, 100%)",
                fontSize: "4em",
                fontFamily: "Bricolage Grotesque",
                textAlign: "center",
              }
        }
      >
        How&apos;s the sky looking today?
      </Typography>
      <Box
        sx={
          laptop
            ? { width: "40%", display: "flex", alignItems: "center" }
            : { width: "100%" }
        }
      >
        <Box
          sx={
            laptop
              ? {
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "hsl(243, 23%, 24%)",
                  padding: ".6em",
                  borderRadius: "8px",
                  width: "100%",
                  margin: "50px auto",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "hsl(243, 23%, 24%)",
                  padding: ".6em",
                  borderRadius: "8px",
                  width: "100%",
                  margin: "10px 0px",
                }
          }
        >
          <SearchIcon sx={{ color: "hsl(0, 0%, 100%)" }} />
          <input
            style={{
              color: "hsl(0, 0%, 100%)",
              margin: "0 10px",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            placeholder="Search for a place..."
            value={place}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </Box>
        <Button
          variant="contained"
          sx={
            laptop
              ? {
                  borderRadius: "8px",
                  padding: ".6em 2em",
                  textTransform: "capitalize",
                  margin: "0 10px",
                  backgroundColor: "hsl(248, 70%, 36%)",
                }
              : {
                  width: "100%",
                  textTransform: "capitalize",
                  backgroundColor: "hsl(248, 70%, 36%)",
                  borderRadius: "8px",
                  padding: ".6em 2em",
                }
          }
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>
    </Box>
  );
};
