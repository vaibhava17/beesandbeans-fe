import { decorate, observable, runInAction } from "mobx";
import { getCartItems, addToCart, updateCartItem, removeFromCart } from "../../service/cartService";

class ObservableCartStore {
  cartItems = [];
  cartItem = {};
  amount = 0;
  products = [];
  cartLoading = false;
  cartError = null;
  response = null;

  setAmount = (amount) => {
    runInAction(()=>{
      this.amount = amount
    })
  }

  getCartItems = async () => {
    this.cartLoading = true;
    const cartResponse = await getCartItems();
    try {
      runInAction(() => {
        this.cartItems = cartResponse.items;
        this.cartLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.cartError = err;
        this.cartLoading = false;
      });
    }
    return this.cartItems || this.cartError;
  }

  addToCart = async (data) => {
    this.cartLoading = true;
    const cartResponse = await addToCart(data);
    try {
      runInAction(() => {
        this.cartItem = cartResponse.data;
        this.cartLoading = false;
        this.getCartItems();
      });
    } catch (err) {
      runInAction(() => {
        this.cartError = err;
        this.cartLoading = false;
      });
    }
    return this.cartItem || this.cartError;
  }

  updateCartItem = async (data, id) => {
    this.cartLoading = true;
    const cartResponse = await updateCartItem(data, id);
    try {
      runInAction(() => {
        this.cartItem = cartResponse.data;
        this.cartLoading = false;
        this.getCartItems();
      });
    } catch (err) {
      runInAction(() => {
        this.cartError = err;
        this.cartLoading = false;
      });
    }
    return this.cartItem || this.cartError;
  }

  removeFromCart = async (id) => {
    this.cartLoading = true;
    const deleteResponse = await removeFromCart(id);
    try {
      runInAction(() => {
        this.response = deleteResponse;
        this.cartLoading = false;
        this.getCartItems();
      });
    } catch (err) {
      runInAction(() => {
        this.cartError = err;
        this.cartLoading = false;
      });
    }
    return this.response || this.cartError;
  }
};

decorate(ObservableCartStore, {
  cartItems: observable,
  cartItem: observable,
  cartLoading: observable,
  cartError: observable,
  response: observable,
});
export default new ObservableCartStore();
