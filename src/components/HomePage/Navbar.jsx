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
import { ADMIN } from "../../helpers/const";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user.email);
  const { likesCount } = usePosts();
  const { addPostToCard, getPostsCountInCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [badgeCount, setBadgeCount] = useState(0);
  useEffect(() => {
    setBadgeCount(getPostsCountInCart());
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOut();
    handleClose(); // Закрываем меню после выхода
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

  const isAdmin = user && user === ADMIN; // Проверяем, является ли пользователь администратором

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
      }}
    >
      <AppBar sx={{ background: "#383838" }} position="static">
        <Toolbar>
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
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  background: "#686868",
                  borderRadius: "45px",
                  border: "3px solid #ccc",
                  height: "27px",
                  "&:hover": {
                    "& .MuiFilledInput-root": {
                      borders: "#D0D0D0",
                      transition: "background-color 200ms linear",
                    },
                    "&:focus": {
                      backgroundColor: "#D0D0D0",
                    },
                  },
                }}
                id="outlined-search"
                type="search"
                fullWidth
                variant="standard"
                onInput={(e) => setSearch(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          {!isAdmin && (
            <Link to={"/cart"}>
              <Badge badgeContent={badgeCount} color="success">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </Link>
          )}
          <IconButton size="large" color="inherit">
            <Badge badgeContent={likesCount} color="success">
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
          <Typography sx={{ color: "white" }}>
            {user
              ? `Hello, ${user.email}`
              : `Hello, guest. Please register or sign in `}
          </Typography>
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
            onClick={handleOutsideClick}
          >
            {user ? (
              <div>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </div>
            ) : (
              <div>
                <Link to="/auth">
                  <MenuItem onClick={handleMenuItemClick}>Register</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem onClick={handleMenuItemClick}>Sign In</MenuItem>
                </Link>
              </div>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
