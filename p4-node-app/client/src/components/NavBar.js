import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Lock, PendingActionsOutlined } from "@mui/icons-material";

const NavBar = () => {
  return (
    <AppBar>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ mr: 0.1 }}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <PendingActionsOutlined fontSize="2rem" />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component={"h1"}
            noWrap
            fontSize={"2rem"}
            fontFamily={"prompt"}
            fontWeight={"bold"}
            py={"0"}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            MONitime
          </Typography>
          <Typography
            variant="h6"
            component={"h1"}
            noWrap
            fontSize={"2.5rem"}
            fontFamily={"prompt"}
            fontWeight={"bold"}
            py={"0"}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            M
          </Typography>

          <Button
            color="inherit"
            startIcon={<Lock />}
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
