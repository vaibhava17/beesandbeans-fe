import { decorate, observable, runInAction } from "mobx";
import { getAllAddresses, addAddress, updateAddress, deleteAddress, getAddressById } from "../../service/addressService";

class ObservableAddressStore {
  addresses = [];
  address = {};
  addressLoading = false;
  addressError = null;
  response = null;

  getAllAddresses = async () => {
    try {
      this.addressLoading = true;
      const addressResponse = await getAllAddresses();
      runInAction(() => {
        this.addresses = addressResponse.items;
        this.addressLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.addressError = err;
        this.addressLoading = false;
      });
    }
    return this.addresses || this.addressError;
  }

  getAddressById = async (id) => {
    this.addressLoading = true;
    const addressResponse = await getAddressById(id);
    try {
      runInAction(() => {
        this.address = addressResponse.data;
        this.addressLoading = false;
        this.getAllAddresses();
      });
    } catch (err) {
      runInAction(() => {
        this.addressError = err;
        this.addressLoading = false;
      });
    }
    return this.address || this.addressError;
  };

  addAddress = async (data) => {
    this.addressLoading = true;
    const addressResponse = await addAddress(data);
    try {
      runInAction(() => {
        this.address = addressResponse.data;
        this.addressLoading = false;
        this.getAllAddresses();
      });
    } catch (err) {
      runInAction(() => {
        this.addressError = err;
        this.addressLoading = false;
      });
    }
    return this.address || this.addressError;
  }

  updateAddress = async (data, id) => {
    this.addressLoading = true;
    const addressResponse = await updateAddress(data, id);
    try {
      runInAction(() => {
        this.address = addressResponse.data;
        this.addressLoading = false;
        this.getAllAddresses();
      });
    } catch (err) {
      runInAction(() => {
        this.addressError = err;
        this.addressLoading = false;
      });
    }
    return this.address || this.addressError;
  }

  deleteAddress = async (id) => {
    this.addressLoading = true;
    const deleteResponse = await deleteAddress(id);
    try {
      runInAction(() => {
        this.response = deleteResponse;
        this.addressLoading = false;
        this.getAllAddresses();
      });
    } catch (err) {
      runInAction(() => {
        this.addressError = err;
        this.addressLoading = false;
      });
    }
    return this.response || this.addressError;
  }
};

decorate(ObservableAddressStore, {
  addresses: observable,
  address: observable,
  addressLoading: observable,
  addressError: observable,
  response: observable,
});
export default new ObservableAddressStore();
