"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWeather } from "../context/WeatherContext";
import { useUnits } from "../context/UnitsContext";

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
        hourly: "temperature_2m",
        daily: "temperature_2m_max,temperature_2m_min",
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
          temperature: hourly.temperature_2m?.[index],
        })) || [];

      const dailyTemps =
        daily?.time?.map((time, index) => ({
          time,
          max: daily.temperature_2m_max?.[index],
          min: daily.temperature_2m_min?.[index],
        })) || [];

      setWeather({
        location: `${name}${country ? `, ${country}` : ""}`,
        temperature: current?.temperature,
        windSpeed: current?.windspeed,
        windDirection: current?.winddirection,
        weatherCode: current?.weathercode,
        hourlyTemps,
        dailyTemps,
      });
    } catch (err) {
      setWeather(null);
      setError(err.message || "Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "hsl(0, 0%, 100%)",
          fontSize: "2.4em",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        How&apos;s the sky looking today?
      </Typography>
      <Box sx={{ width: "40%", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "hsl(243, 23%, 24%)",
            padding: ".6em",
            borderRadius: "8px",
            width: "100%",
            margin: "50px auto",
          }}
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
          sx={{
            borderRadius: "8px",
            padding: ".6em 2em",
            textTransform: "capitalize",
            margin: "0 10px",
            backgroundColor: "hsl(248, 70%, 36%)",
          }}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>
      {error && (
        <Typography sx={{ color: "hsl(0, 70%, 70%)", marginBottom: "10px" }}>
          {error}
        </Typography>
      )}
      {weather && (
        <Box
          sx={{
            backgroundColor: "hsl(243, 23%, 24%)",
            border: "1px solid hsl(243, 23%, 30%)",
            borderRadius: "10px",
            padding: "16px 20px",
            color: "hsl(0, 0%, 100%)",
            width: "90%",
            maxWidth: "900px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Typography sx={{ fontSize: "1.1em", fontWeight: "600" }}>
            {weather.location}
          </Typography>
          <Typography sx={{ fontSize: "2.4em", fontWeight: "700" }}>
            {weather.temperature}°
          </Typography>
          <Typography sx={{ fontSize: ".95em", color: "hsl(240, 6%, 70%)" }}>
            Wind: {weather.windSpeed} {units.windSpeed} · Dir: {weather.windDirection}°
          </Typography>
          {weather.weatherCode !== undefined && (
            <Typography sx={{ fontSize: ".9em", marginTop: "6px" }}>
              Code: {weather.weatherCode}
            </Typography>
          )}
          {weather.hourlyTemps?.length > 0 && (
            <Box sx={{ marginTop: "16px", textAlign: "left" }}>
              <Typography sx={{ fontSize: "1em", fontWeight: "600" }}>
                Hourly (next hours)
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  paddingTop: "6px",
                }}
              >
                {weather.hourlyTemps.slice(0, 8).map((item) => (
                  <Box
                    key={item.time}
                    sx={{
                      backgroundColor: "hsl(243, 27%, 20%)",
                      borderRadius: "8px",
                      padding: "8px",
                      minWidth: "70px",
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: ".8em" }}>
                      {new Date(item.time).getHours()}:00
                    </Typography>
                    <Typography sx={{ fontWeight: "700" }}>
                      {item.temperature}°
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {weather.dailyTemps?.length > 0 && (
            <Box sx={{ marginTop: "16px", textAlign: "left" }}>
              <Typography sx={{ fontSize: "1em", fontWeight: "600" }}>
                This week
              </Typography>
              <Box sx={{ display: "grid", gap: "6px", marginTop: "6px" }}>
                {weather.dailyTemps.slice(0, 7).map((item) => (
                  <Box
                    key={item.time}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "hsl(243, 27%, 20%)",
                      padding: "8px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography sx={{ fontSize: ".9em" }}>
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
          )}
        </Box>
      )}
    </Box>
  );
};
