import { decorate, observable, runInAction } from "mobx";
import { createOrder, paymentComplition, getOrderList, cancelOrder } from "../../service/paymentService/index.js";

class ObservablePaymentStore {
  orderList = [];
  data = null;
  response = null;
  options = null;

  setData = (data) => {
    runInAction(() => {
      this.data = data;
    });
  }

  createOrder = async (data) => {
    const orderResponse = await createOrder(data);
    try {
      runInAction(() => {
        this.response = orderResponse.data;
      });
    } catch (err) {
      this.response = err;
    }
    return this.response
  };

  makePayment = async (data) => {
    runInAction(() => {
      this.options = {
        key: "rzp_test_saCwZIXsqaqQCH",
        amount: data.amount,
        currency: data.currency,
        name: data.name,
        description: `Payment for order id ${data.orderId}`,
        order_id: data.orderId,
        handler: async function (response) {
          const values = {
            orderCreationId: data.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          paymentComplition(values).then((res) => {
            console.log(res);
          });
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.mobile,
        },
        notes: {
          address: data.address,
        },
        theme: {
          color: "#97801c",
        },
      }
    });
    return this.options;
  }

  getOrderList = async () => {
    const ordersResponse = await getOrderList();
    try {
      runInAction(() => {
        this.orderList = ordersResponse.items;
      });
    } catch (err) {
      this.orderList = err;
    }
    return this.orderList
  }

  cancelOrder = async (data) => {
    const ordersResponse = await cancelOrder(data);
    try {
      runInAction(() => {
        this.response = ordersResponse.data;
        this.getOrderList();
      });
    }
    catch (err) {
      this.response = err;
    }
    return this.response
  }
};

decorate(ObservablePaymentStore, {
  orderList: observable,
  response: observable,
  options: observable,
});
export default new ObservablePaymentStore();
