import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import cardImage from "./sample-card-image.jpg";

const Header = () => {
  // TODO: remove this once implemented na
  const user = "Robin";
  return (
    <Box width="300px">
      <Card
        sx={{
          border: "1px solid gray",
          borderRadius: "20px",
          height: "410px",
          width: "250px",
          position: "relative",
        }}
      >
        {/* TODO: fix the avatar */}
        <Box
          // border="1px solid red"
          width="100%"
          pt={2}
        >
          <Avatar sx={{ margin: "0 auto", height: "100px", width: "100px" }}>
            RM
          </Avatar>
        </Box>
        <CardContent>
          <Box>
            {/* TODO: fix the wordings */}
            <Typography variant="h4">Hi {user}</Typography>
            <Typography
              margin="0.5rem 0"
              variant="body1"
            >
              Here is your summary for the last year from today!
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ position: "absolute", bottom: "5px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button size="small">Week</Button>
            <Button size="small">Month</Button>
            <Button size="small">Quarter</Button>
            <Button size="small">Year</Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Header;
