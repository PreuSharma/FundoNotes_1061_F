import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import googleKeep from "../../assests/googleKeep.png";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import ViewStreamIcon from "@mui/icons-material/ViewStream"; // Similar list view icon
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import "./Header.scss";
import toast from "react-hot-toast";

export default function Header({ setSearchQuery, isListView, setIsListView }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const getTitle = () => {
    if (location.pathname.includes("archive")) return "Archive";
    if (location.pathname.includes("trash")) return "Trash";
    if (location.pathname.includes("reminders")) return "Reminders";
    if (location.pathname.includes("edit-labels")) return "Edit Labels";
    return "Keep";
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // window.location.href = "/";
    navigate("/");
    toast.success("Logout Successful");
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setIsListView(!isListView);
  };

  const handleRefresh = () => {
    if (refreshing) return; // Prevent multiple clicks
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Rotate for 1 second
  };


  React.useEffect(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Animation lasts 1 sec
  }, []);

  const triggerRefreshAnimation = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Animation lasts 1 sec
  };



  return (
    <div className="header">
      {/* Left Side */}
      <div className="header-left">
        <MenuIcon className="icon" onClick={toggleDrawer(true)} />

        {getTitle() === "Keep" && (
          <div className="header-image">
            <img src={googleKeep} alt="header-img" id="header-img" />
          </div>
        )}

        <h2>{getTitle()}</h2>
      </div>

      {/* Search Box */}
      <div className="header-search">
        <SearchIcon className="icon" />
        <input
          type="text"
          placeholder="Search Notes"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right Side */}
      <div className="header-right">
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon className={`icon ${refreshing ? "rotate" : ""}`} />
          </IconButton>
        </Tooltip>

        <Tooltip title={isListView ? "Grid View" : "List View"}>
          <IconButton onClick={handleToggle}>
            {isListView ? (
              <ViewModuleIcon className="icon" />
            ) : (
              <ViewStreamIcon className="icon" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Settings">
          <IconButton>
            <SettingsIcon className="icon" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Apps">
          <IconButton>
            <AppsIcon className="icon" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Google Account">
          <IconButton>
            <IconButton onClick={handleMenuOpen}>
              <AccountCircleIcon className="icon" />
            </IconButton>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <PersonIcon style={{ marginRight: 8 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon style={{ marginRight: 8 }} />
            Settings
          </MenuItem>

          {/* Logout */}
          <MenuItem onClick={handleLogout}>
            <LogoutIcon style={{ marginRight: 8 }} />
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ className: "custom-drawer" }}
        className="fundoo-drawer"
        disableScrollLock
        ModalProps={{
          BackdropProps: { style: { backgroundColor: "transparent" } },
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => handleNavigation("/dashboard/notes")}
            style={{
              backgroundColor:
                location.pathname === "/dashboard/notes"
                  ? "#FFF9C4"
                  : "transparent",
              width: "100%",
              cursor: "pointer",
              borderRadius: "0px 50px 50px 0px",
            }}
          >
            <ListItemIcon>
              <LightbulbOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Notes"
              style={{
                color:
                  location.pathname === "/dashboard/notes"
                    ? "#FFD700"
                    : "inherit",
              }}
            />
          </ListItem>

          <ListItem
            button
            onClick={() => handleNavigation("/dashboard/reminders")}
            style={{
              backgroundColor:
                location.pathname === "/dashboard/reminders"
                  ? "#FFF9C4"
                  : "transparent",
              width: "100%",
              cursor: "pointer",
              borderRadius: "0px 50px 50px 0px",
            }}
          >
            <ListItemIcon>
              <NotificationsNoneOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Reminders" />
          </ListItem>

          <ListItem
            button
            onClick={() => handleNavigation("dashboard/edit-labels")}
          >
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Labels" />
          </ListItem>

          <ListItem
            button
            onClick={() => handleNavigation("/dashboard/archive")}
            style={{
              backgroundColor:
                location.pathname === "/dashboard/archive"
                  ? "#FFF9C4"
                  : "transparent",
              width: "100%",
              cursor: "pointer",
              borderRadius: "0px 50px 50px 0px",
            }}
          >
            <ListItemIcon>
              <ArchiveOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Archive"
              style={{
                color:
                  location.pathname === "/dashboard/archive"
                    ? "#FFD700"
                    : "inherit",
              }}
            />
          </ListItem>

          <ListItem
            button
            onClick={() => handleNavigation("/dashboard/trash")}
            style={{
              backgroundColor:
                location.pathname === "/dashboard/trash"
                  ? "#FFF9C4"
                  : "transparent",
              width: "100%",
              cursor: "pointer",
              borderRadius: "0px 50px 50px 0px",
            }}
          >
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Trash"
              style={{
                color:
                  location.pathname === "/dashboard/trash"
                    ? "#FFD700"
                    : "inherit",
              }}
            />
          </ListItem>
        </List>
      </Drawer>
      <style>
        {`
          .rotate {
            animation: spin 1s linear;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
