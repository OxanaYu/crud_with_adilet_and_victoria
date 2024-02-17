import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, getCart, deletePostFromCart } = useCart();
  console.log(cart.products);

  useEffect(() => {
    getCart();
  }, []);

  //   const cartCliner = () => {
  //     localStorage.removeItem("cart");
  //     getCart();
  //     console.log(cart);
  //   };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Picture</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Description</TableCell>

            <TableCell align="right">Count</TableCell>
            <TableCell align="right">SubPrice</TableCell>
            <TableCell align="right">-</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cart.postsincart.map((elem) => (
            <TableRow
              key={elem.item.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="right" scope="row" component="th">
                <img src={elem.item.photo} alt="" width={70} />
              </TableCell>
              <TableCell align="right">{elem.item.name}</TableCell>
              {/* <TableCell align="right">{elem.item.category}</TableCell> */}
              <TableCell align="right">{elem.item.description}</TableCell>
              <TableCell align="right">
                <input
                  //   onChange={(e) => {
                  //     changeProductCount(elem.item.id, e.target.value);
                  //   }}
                  type="number"
                  min={1}
                  max={20}
                  //   defaultValue={elem.count}
                />
              </TableCell>
              {/* <TableCell align="right">{elem.subPrice}</TableCell> */}
              <TableCell align="right">
                <Button onClick={() => deletePostFromCart(elem.item.id)}>
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Button onClick={cartCliner}>BUY NOW FOR {cart.totalPrice}</Button> */}
    </TableContainer>
  );
};

export default Cart;
