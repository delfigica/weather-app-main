"use client";
import React from "react";
import Image from "next/image";
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

export const WeatherIcon = ({ code, size = 60, alt = "weather icon" }) => {
  if (code === undefined || code === null) return null;
  const icon = getIcon(code);
  return <Image src={icon} alt={alt} width={size} height={size} priority />;
};
