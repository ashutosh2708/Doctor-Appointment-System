import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
  return (
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
          <Badge badgeContent={user && user.notification.length} color="error">
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
  );
};

export default Navbar;
