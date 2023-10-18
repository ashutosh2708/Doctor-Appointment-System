import React from "react";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import MuiDrawer from "@mui/material/Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useAppStore } from "../appStore";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  // eslint-disable-next-line
  const theme = useTheme();
  const open = useAppStore((state) => state.dopen);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  //doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <ListIcon />,
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: <PersonIcon />,
    },
  ];

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
      </DrawerHeader>
      <Divider />
      {SidebarMenu.map((menu, index) => {
        const isActive = location.pathname === menu.path;
        return (
          <>
            <List>
              <Link
                to={menu.path}
                key={index}
                className={`flex text-gray-700 transition-all ${
                  isActive && "bg-slate-500 text-white"
                }`}
              >
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: "left",
                      paddingRight: 15,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 0 : 5,
                        justifyContent: "center",
                      }}
                    >
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }} />
                    {menu.name}
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </>
        );
      })}
      <List>
        <Link
          to="/login"
          className={`flex text-gray-700 transition-all`}
          onClick={handleLogout}
        >
          <div className="text-xl">
            <LogoutIcon />
          </div>
          <div style={{ display: open ? "block" : "none" }} className="text-xl">
            Log out
          </div>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
