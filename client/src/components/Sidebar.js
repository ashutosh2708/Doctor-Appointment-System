import React, { useState } from "react";
import { adminMenu, userMenu } from "../Data/data";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
    <>
      <div className="flex">
        <div
          style={{ width: isOpen ? "200px" : "50px" }}
          className="bg-[#111827] text-[#fff] h-screen w-52 transition-all mr-2"
        >
          <div className="flex items-center py-4 px-3">
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className="text-xl"
            >
              DOC APP
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="flex text-xl ml-12 cursor-pointer"
            >
              <MenuIcon onClick={toggle} />
            </div>
          </div>
          {SidebarMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                to={menu.path}
                key={index}
                className={`flex text-white py-3 px-3 gap-4 transition-all ${
                  isActive && "bg-slate-700"
                }`}
              >
                <div className="text-xl">{menu.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="text-xl"
                >
                  {menu.name}
                </div>
              </Link>
            );
          })}
          <Link
            to="/login"
            className={`flex text-white py-3 px-3 gap-4 transition-all`}
            onClick={handleLogout}
          >
            <div className="text-xl">
              <LogoutIcon />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="text-xl"
            >
              Log out
            </div>
          </Link>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-end h-16 shadow-lg mb-2 bg-white">
            <div>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"                
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <Badge
                  badgeContent={user && user.notification.length}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
            <div className="mr-4 text-lg">
              <Link to="/profile">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="w-full h-screen shadow-lg shadow-gray-700 bg-white">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
