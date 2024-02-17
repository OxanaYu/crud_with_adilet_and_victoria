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
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const { user, LogOut } = useAuth;
  const { likesCount } = usePosts();
  const { addPostToCard, getProductsCountInCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [badgeCount, setBadgeCount] = useState(0);
  useEffect(() => {
    setBadgeCount(getProductsCountInCart());
  }, [addPostToCard]);

  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);

  const pages = [
    { id: 1, title: "Posts", link: "/posts" },
    { id: 2, title: "Add Post", link: "/admin" },
    { id: 3, title: "Bookmarks", link: "/bm" },
  ];

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
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
      }}
    >
      <AppBar sx={{ background: "#383838" }} position="static">
        <Toolbar>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          {pages.map((elem) => (
            <MenuItem key={elem.id}>
              <Link
                to={elem.link}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography textAlign="center">{elem.title}</Typography>
              </Link>
            </MenuItem>
          ))}
          <Grid container justifyContent="center">
            <Grid item>
              <TextField
                sx={{
                  background: "#686868",
                  borderRadius: "45px",
                  border: "3px solid #ccc",
                  height: "27px",
                  "& .MuiFilledInput-root": {
                    borders: "#D0D0D0", // чтобы сохранить границы
                    // transition: "background-color 200ms linear",
                    "&:hover": {
                      backgroundColor: "#D0D0D0", // изменение фона при наведении
                    },
                    "&:focus": {
                      backgroundColor: "#D0D0D0", // изменение фона при фокусировке
                    },
                  },
                }}
                id="outlined-search"
                // label="Search"
                type="search"
                fullWidth
                variant="standard"
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
          <Link to={"/cart"}>
            <Badge badgeContent={badgeCount} color="success">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </Link>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={likesCount} color="white">
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
