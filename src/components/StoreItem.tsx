import { Card, Button } from "react-bootstrap";

import { formatCurrency } from "./../utils/formatCurrency";

type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: storeItemProps) => {
  const quantity = 10;
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {!quantity ? (
            <Button className="w-100">+ Add To Cart</Button>
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ gap: "0.5rem" }}
              >
                <Button>-</Button>
                <div>
                <span className="fs-3">{quantity}</span> <span>in cart</span>
                </div>
                <Button>+</Button>
              </div>
              <Button variant="danger" size="sm" className="w-100">Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
