import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import { useShoppingCart } from "./../context/ShoppingCartContext";

import storeItems from "../data/items.json";

import { formatCurrency } from "./../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((cart) => cart.id === id);
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item?.imgUrl}
        alt="Cart Image"
        width="125px"
        height="75px"
        style={{ objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          <span>{item?.name} </span>
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
          <div style={{ fontSize: "0.75rem" }}>
            <span className="text-muted">{formatCurrency(item!.price)}</span>
          </div>
        </div>
      </div>
      <div>
        <span>{formatCurrency(item!.price * quantity)}</span>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item!.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
