import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Navbar = () => {
  const { user, LogOut } = useAuth;
  const { likesCount } = usePosts();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogOut = () => {
    LogOut();
    handleClose(); // Закрываем меню после выхода
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    handleClose(); // Закрываем меню при выборе пункта
  };

  const handleOutsideClick = (event) => {
    if (anchorEl && !anchorEl.contains(event.target)) {
      handleClose(); // Закрываем меню при клике вне него
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <TextField
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "transparent", // чтобы сохранить границы
                    transition: "background-color 200ms linear",
                    "&:hover": {
                      backgroundColor: "transparent", // изменение фона при наведении
                    },
                    "&:focus": {
                      backgroundColor: "transparent", // изменение фона при фокусировке
                    },
                  },
                }}
                id="outlined-search"
                label="Search"
                type="search"
                // variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={likesCount} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          {user ? (
            <Tooltip title={user.email}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={handleMenu}
              >
                <Avatar alt={user.email} src={user.photoUrl} />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
          )}

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleOutsideClick} // Обработчик клика вне меню
          >
            {user ? (
              <>
                <Link to="/auth">
                  <MenuItem onClick={handleMenuItemClick}>Register</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem onClick={handleMenuItemClick}>Sign In</MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <MenuItem onClick={handleMenuItemClick}>Register</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem onClick={handleMenuItemClick}>Sign In</MenuItem>
                </Link>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
