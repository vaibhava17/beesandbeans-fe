import ObservableUserStore from "./user/userStore";
import ObservableProductsStore from "./product/productStore";
import ObservableBlogsStore from "./blog/blogStore";
import ObservableMailsStore from "./mail/mailStore";
import ObservableUploadsStore from "./upload/uploadStore";
import ObservableCategoriesStore from "./category/categoryStore";
import ObservableTagsStore from "./tag/tagStore";
import ObservablePopupStore from "./popup/popupStore";
import ObservableCartStore from "./cart/cartStore";
import ObservableAddressStore from "./address/addressStore";
import ObservablePaymentStore from "./payment/paymentStore";
import ObservableFaqsStore from "./faq/faqStore";

class RootStore {
  constructor() {
    this.userStore = ObservableUserStore;
    this.productStore = ObservableProductsStore;
    this.blogStore = ObservableBlogsStore;
    this.mailStore = ObservableMailsStore;
    this.uploadStore = ObservableUploadsStore;
    this.categoryStore = ObservableCategoriesStore;
    this.tagStore = ObservableTagsStore;
    this.popupStore = ObservablePopupStore;
    this.cartStore = ObservableCartStore;
    this.addressStore = ObservableAddressStore;
    this.paymentStore = ObservablePaymentStore;
    this.faqStore = ObservableFaqsStore;
  }
}

export default RootStore;