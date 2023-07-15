import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";

import CartItem from "./CartItem";

import { formatCurrency } from "./../utils/formatCurrency";
import { useShoppingCart } from "./../context/ShoppingCartContext";
import storeItems from "../data/items.json";

const ShoppingCart = () => {
  const { isOpen, toggleCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={toggleCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            <span>
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((acc, currentItem) => {
                  const item = storeItems.find(
                    (cart) => cart.id === currentItem.id
                  );
                  return acc + (item?.price || 0) * currentItem.quantity;
                }, 0)
              )}
            </span>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
