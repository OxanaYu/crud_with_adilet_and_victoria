// import React, { useState } from "react";
// import {
//   AppBar,
//   Avatar,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";
// import { AccountCircle } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleLogOut = () => {
//     logOut();
//     handleClose(); // Закрываем меню после выхода
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuItemClick = () => {
//     handleClose(); // Закрываем меню при выборе пункта
//   };

//   const handleOutsideClick = (event) => {
//     if (anchorEl && !anchorEl.contains(event.target)) {
//       handleClose(); // Закрываем меню при клике вне него
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>

//           {user ? (
//             <Tooltip title={user.email}>
//               <IconButton
//                 size="large"
//                 edge="end"
//                 color="inherit"
//                 aria-label="menu"
//                 sx={{ mr: 1 }}
//                 onClick={handleMenu}
//               >
//                 <Avatar alt={user.email} src={user.photoUrl} />
//               </IconButton>
//             </Tooltip>
//           ) : (
//             <IconButton
//               size="large"
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 1 }}
//               onClick={handleMenu}
//             >
//               <AccountCircle />
//             </IconButton>
//           )}

//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//             onClick={handleOutsideClick} // Обработчик клика вне меню
//           >
//             {user ? (
//               <>
//                 <Link to="/auth">
//                   <MenuItem onClick={handleMenuItemClick}>Register</MenuItem>
//                 </Link>
//                 <Link to="/login">
//                   <MenuItem onClick={handleMenuItemClick}>Sign In</MenuItem>
//                 </Link>
//                 <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
//               </>
//             ) : (
//               <>
//                 <Link to="/auth">
//                   <MenuItem onClick={handleMenuItemClick}>Register</MenuItem>
//                 </Link>
//                 <Link to="/login">
//                   <MenuItem onClick={handleMenuItemClick}>Sign In</MenuItem>
//                 </Link>
//               </>
//             )}
//           </Menu>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Navbar;
