import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Popover,
} from "@mui/material";
import { Menu as MenuIcon, Person } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

// import UserIntegration from '../container/appBar/userIntegration';

const fetchUserList = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const userId = localStorage.getItem("userid");
  const response = await axios.get(
    `http://localhost:5000/api/users/${userId}`,
    config
  );

  return response.data;
};

const useUserList = () => {
  return useQuery("userList", fetchUserList);
};
function ResponsiveAppBar() {
  const { data: userList, isLoading } = useUserList();

  const username = userList?.data?.name;

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  function logout() {
    localStorage.removeItem("this is token");
    navigate("/signin");
  }

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const openUserMenu = Boolean(anchorEl);
  const userMenuId = openUserMenu ? "user-menu-popover" : undefined;

  const links = (
    <List>
      <ListItemButton>
        <ListItemText primary="Login" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Logout" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Contact" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/usertabledata")}>
        <ListItemText primary="User Locations" />
      </ListItemButton>
      {isMdUp && (
        <ListItem>
          <IconButton style={{ color: "white" }} onClick={handleUserMenuClick}>
            <Person />
          </IconButton>
        </ListItem>
      )}
    </List>
  );

  const userMenu = (
    <Popover
      id={userMenuId}
      open={openUserMenu}
      anchorEl={anchorEl}
      onClose={handleUserMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div style={{ padding: "15px" }}>
        <List>
          <ListItemButton
            onClick={() => navigate("/signin")}
            style={{ margin: 0, padding: 0 }}
          >
            <ListItemIcon style={{ minWidth: 0, marginRight: "0.7rem" }}>
              <Person />
            </ListItemIcon>
            <ListItemText primary="sign in" />
          </ListItemButton>
        </List>

        <div>
          <List>
            <ListItemButton onClick={logout} style={{ margin: 0, padding: 0 }}>
              <ListItemIcon style={{ minWidth: 0, marginRight: "0.5rem" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </List>
        </div>
        <div>
          <List>
            <ListItemButton
              onClick={() => navigate("/usertabledata")}
              style={{ margin: 0, padding: 0 }}
            >
              <ListItemIcon style={{ minWidth: 0, marginRight: "0.5rem" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="userLocation" />
            </ListItemButton>
          </List>
        </div>
      </div>
    </Popover>
  );

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {!isMdUp && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            style={{ marginRight: "16px" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          SummerizedBot
        </Typography>
        {isMdUp && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
              {username}
            </Typography>

            <IconButton
              style={{
                color: "white",
                flexGrow: 1,
                textAlign: "left",
                marginLeft: "10px",
                fontSize: "16px",
              }}
              onClick={handleUserMenuClick}
            >
              <Person />
            </IconButton>
            {userMenu}
          </div>
        )}
      </Toolbar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        style={{ width: "250px" }}
      >
        {links}
      </Drawer>
    </AppBar>
  );
}

export default ResponsiveAppBar;
