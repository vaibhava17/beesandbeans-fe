import React from "react";
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Drawer, Typography } from "antd";
// import { productAmount } from "../../constants/cart.constants";
import CartCard from "./CartCard";
import Button from "../Button/Button";

function CartDrawer(props) {
  const { popupStore, cartStore } = props;
  const { cartItems } = cartStore;
  const navigate = useNavigate();

  return (
    <Drawer
      title={<Typography.Title level={3} className="text-center text-uppercase m-0 heading-text">Cart Items</Typography.Title>}
      closeIcon={<i className="fas fa-times fs-6" />}
      placement="right"
      onClose={() => {
        popupStore.togglePopup("showCartDrawer", false);
      }}
      visible={popupStore.showCartDrawer}
      footer={
        cartItems && cartItems.length === 0 ? (
          <Button
            label="See More Products"
            onClick={() => {
              navigate("/products");
              popupStore.togglePopup("showCartDrawer", false);
            }}
          />
        ) : (
          <div className="flex-colume text-center w-75">
            <div className="flex-row d-flex justify-content-between">
              <Typography.Text className="main-text">Grand Total</Typography.Text>
              {/* <Typography.Text className="fw-bold">Rs {productAmount(cartItems)}</Typography.Text> */}
            </div>
            <Button
              label="Buy Now"
              className="mt-3"
              onClick={() => {
                navigate("/cart");
                popupStore.togglePopup("showCartDrawer", false);
              }}
            />
          </div>
        )
      }
      footerStyle={{ display: "flex", justifyContent: "center" }}
    >
      <>
        {cartItems && cartItems.length === 0 ? (
          <>
            <p className="text-center">
              Cart is Empty
              <br /> Add items to Cart
            </p>
          </>
        ) : (
          <>
            {cartItems &&
              cartItems.map((item) => (
                <CartCard
                  key={item._id}
                  id={item._id}
                  product={item.productId}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}
          </>
        )}
      </>
    </Drawer>
  );
}

export default inject((stores) => ({
  popupStore: stores.store.popupStore,
  cartStore: stores.store.cartStore,
}))(observer(CartDrawer));
