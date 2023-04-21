import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React from "react";
import SummaryCardContent from "./SummaryCardContent";

const randomBGcolors = [
  "#6a040f",
  "#14213d",
  "#16697a",
  "#e01772",
  "#55a630",
  "#6411ad",
  "#2d3142",
  "#d90368",
  "#3185fc",
  "#d90429",
  "#006d77",
  "#344e41",
  "#01161e",
  "#e36414",
  "#5F0F40",
  "#9A031E",
];

const SummaryCard = ({ title }) => {
  const randomColor =
    randomBGcolors[Math.floor(Math.random() * randomBGcolors.length)];

  console.log(randomColor);
  return (
    <Card sx={{ width: "250px", height: "180px", borderRadius: "20px" }}>
      <Box
        height="40px"
        sx={{
          backgroundColor: alpha(randomColor, 0.5),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
      </Box>
      <CardContent>
        <SummaryCardContent
          variant="h5"
          fs="24px"
          fstyle="Prompt"
          content={["11.0", "8.0", "32.2%"]}
        />
        <SummaryCardContent
          variant="body1"
          fs="16px"
          ff="Prompt"
          content={["Tot(hrs)", "Ave(hrs)", "%"]}
        />
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-around"
        >
          <Typography variant="body1">Tot(hrs)</Typography>
          <Typography>Ave(hrs)</Typography>
          <Typography>%</Typography>
        </Stack>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-around"
        >
          <Typography>11</Typography>
          <Typography>7</Typography>
          <Typography>34.2%</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
