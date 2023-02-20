import { decorate, observable, runInAction } from "mobx";

class ObservablePopupStore {
  showCartDrawer = false;
  showAddressDrawer = false;

  togglePopup(name, state) {
    runInAction(() => {
      this[name] = state;
    });
  }
};

decorate(ObservablePopupStore, {
  showCartDrawer: observable,
  showAddressDrawer: observable,
});
export default new ObservablePopupStore();
