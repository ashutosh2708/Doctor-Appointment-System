import React from "react"; 
import { adminMenu, userMenu } from "../Data/data";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

const Layout = ({ children }) => {
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
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
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
      <div className="p-2 h-screen">
        <div className="flex">
          <div className="w-40 md:w-80 rounded-md bg-gray-800 shadow-md shadow-gray-700 mr-3 text-white">
            <div className="flex items-center justify-center h-16">
              <h6 className="text-light">DOC APP</h6>
            </div>
            <hr />
            <div className="mt-10">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className="">
                    <div
                      className={`mt-7 text-lg ml-3 ${
                        isActive && "py-2 bg-slate-700"
                      }`}
                    >
                      <i className={`mr-2 ${menu.icon}`}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </div>
                );
              })}
              <div className={`text-lg ml-3 mt-7`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="w-full h-screen">
            <div className="flex items-center justify-end h-16 shadow-lg mb-2 bg-white">
              <div className="">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge
                    badgeContent={user && user.notification.length}
                    onClick={() => {
                      navigate("/notification");
                    }}
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
            <div className="h-screen shadow-lg shadow-gray-700 bg-white">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
