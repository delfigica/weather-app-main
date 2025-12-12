"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Box, Button, Typography } from "@mui/material";
import { useUnits } from "../context/UnitsContext";

// ICONS

import DoneIcon from "@mui/icons-material/Done";

//IMAGES
import logo from "@/assets/images/logo.svg";
import unitsIcon from "@/assets/images/icon-units.svg";
import dropdown from "@/assets/images/icon-dropdown.svg";
export const Navbar = () => {
  const options = [
    {
      name: "temperature",
      label: "Temperature",
      options: [
        {
          name: "Celsius (°C)",
          value: "celsius",
        },
        {
          name: "Fahrenheit (°F)",
          value: "fahrenheit",
        },
      ],
    },
    {
      name: "windSpeed",
      label: "Wind Speed",
      options: [
        {
          name: "km/h",
          value: "km/h",
        },
        {
          name: "mph",
          value: "mph",
        },
      ],
    },
    {
      name: "precipitation",
      label: "Precipitation",
      options: [
        {
          name: "Millimeters (mn)",
          value: "millimeters",
        },
        {
          name: "Inches (in)",
          value: "inches",
        },
      ],
    },
  ];

  // STATES
  const { units, setUnits } = useUnits();
  const [showMenu, setShowMenu] = useState(false);

  // FUNCTIONS
  const handleChangeUnits = (name, value) => {
    setUnits({ ...units, [name]: value });
  };

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const switchImperial = () => {
    setUnits({
      temperature: "fahrenheit",
      windSpeed: "mph",
      precipitation: "inches",
    });
  };

  // STYLES
  const titleMenuNavbar = {
    color: "hsl(240, 6%, 70%)",
    fontSize: ".8em",
    fontWeight: "500",
  };

  const optionMenuNavbar = {
    color: "hsl(0, 0%, 100%)",
    padding: "5px",
    margin: "5px 0px",
    fontSize: ".9em",
    fontWeight: "300",
    cursor: "pointer",
  };

  const selectedOption = {
    borderRadius: "5px",
    backgroundColor: "hsl(243, 23%, 24%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...optionMenuNavbar,
  };
  const btnStyle = {
    borderRadius: "10px",
    textTransform: "capitalize",
    padding: "10px 15px",
    backgroundColor: "hsl(243, 27%, 20%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const activeBtn = {
    ...btnStyle,
    border: "2px solid hsl(0, 0%, 100%)",
  };
  const hrStyle = {
    border: "1px solid hsl(243, 23%, 30%)",
    marginBottom: "10px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Image src={logo} width={120} height={120} alt="logo" />
      </Box>
      <Box sx={{ position: "relative" }}>
        <Button
          variant="contained"
          size="medium"
          onClick={toggleShowMenu}
          sx={showMenu ? activeBtn : btnStyle}
        >
          <Image src={unitsIcon} width={15} height={15} alt="settings" />
          <Typography
            sx={{ margin: "0px 10px", fontWeight: "300", fontSize: "1.1em" }}
          >
            Units
          </Typography>
          <Image
            src={dropdown}
            width={12}
            height={12}
            alt="settings"
          />
        </Button>
        {showMenu && (
          <Box
            sx={{
              position: "absolute",
              width: "200px",
              height: "370px",
              backgroundColor: "hsl(243, 27%, 20%)",
              borderRadius: "10px",
              border: "1px solid hsl(243, 23%, 30%)",
              marginTop: "5px",
              padding: "10px",
              right: "0px",
            }}
          >
            <Typography
              onClick={switchImperial}
              sx={{
                border: "1px solid hsl(0, 0%, 100%)",
                padding: "10px 10px",
                color: "hsl(0, 0%, 100%)",
                fontSize: ".9em",
                borderRadius: "8px",
                margin: "-5px -5px 10px -5px",
                cursor: "pointer",
              }}
            >
              Switch to Imperial
            </Typography>
            {options.map((option, index) => (
              <Box key={option.name}>
                <Typography sx={titleMenuNavbar}>{option.label}</Typography>
                {option.options.map((item) => (
                  <Typography
                    sx={
                      units[option.name] == item.value
                        ? selectedOption
                        : optionMenuNavbar
                    }
                    key={item.value}
                    onClick={() => handleChangeUnits(option.name, item.value)}
                  >
                    {item.name}{" "}
                    {units[option.name] == item.value && (
                      <DoneIcon fontSize="small" />
                    )}
                  </Typography>
                ))}
                {index < 2 && <hr style={hrStyle} />}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
