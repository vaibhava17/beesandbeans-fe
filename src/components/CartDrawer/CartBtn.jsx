import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Button } from "antd";
import styles from "./cart.module.css";

const CartBtn = (props) => {
  const { quantity, cartStore, id } = props;

  const { updateCartItem } = cartStore;

  const [state, setState] = useState(quantity);

  function increase() {
    const count = state + 1;
    setState(count);
  }

  function decrease() {
    let count = state - 1;
    if (count < 0) count = 1;
    setState(count);
  }

  useEffect(() => {
    updateCartItem(
      {
        quantity: state,
      },
      id
    );
  }, [state, id, updateCartItem]);
  
  return (
    <>
      <Button
        className={styles.quantityBtn}
        onClick={decrease}
        disabled={state === 1}
      >
        -
      </Button>
      <Button disabled className="text-dark">
        {state}
      </Button>
      <Button
        className={styles.quantityBtn}
        onClick={increase}
        disabled={state === 30}
      >
        +
      </Button>
    </>
  );
};

export default inject((stores) => ({
  cartStore: stores.store.cartStore,
}))(observer(CartBtn));
