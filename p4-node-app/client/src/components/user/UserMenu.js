import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  let navigate = useNavigate();

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
    navigate("/");
    dispatch({ type: "UPDATE_USER", payload: null });
  };

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() =>
            dispatch({
              type: "UPDATE_PROFILE",
              payload: {
                open: true,
                file: null,
                photoURL: currentUser?.photoURL,
              },
            })
          }
        >
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
