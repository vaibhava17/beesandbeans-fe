import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./ErrorBoundary";
import { cookie } from "utils/cookie";
import { AUTH_TOKEN } from "constants/initial";


function DataWrapper(props) {
  const { userStore, cartStore } = props;
  const { getUserProfile } = userStore;
  const { getCartItems } = cartStore;

  const token = cookie.get(AUTH_TOKEN);

  useEffect(() => {
    async function fetchIntialData() {
      await getUserProfile().then((user) => {
        console.log({ user });
      });
      await getCartItems().then((cartItems) => {
        console.log({ cartItems });
      });
    }

    if (token) fetchIntialData();
  }, [token, getUserProfile, getCartItems]);


  function handleOnError(error, info) {
    console.error(error);
    console.log(info);
  }
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onError={handleOnError}
      >
        {props.children}
      </ErrorBoundary>
    </>
  );
}

export default inject((stores) => ({
  userStore: stores.store.userStore,
  cartStore: stores.store.cartStore,
}))(observer(DataWrapper));
