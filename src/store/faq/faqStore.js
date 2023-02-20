import { decorate, observable, runInAction } from "mobx";
import { getFaqs, addFaq, updateFaq, setVisible, deleteFaq } from "../../service/faqService"

class ObservableFaqsStore {
  faqsList = [];
  faq = null;
  visible = true;
  type = "common";
  faqResponse = undefined;
  faqLoading = false;
  faqError = undefined;

  setVisible = async (value) => {
    runInAction(() => {
      this.visible = value;
    });
  };

  setType = async (value) => {
    runInAction(() => {
      this.type = value;
    });
  };

  getFaqs = async () => {
    this.faqLoading = true;
    let params = {};
    if(this.visible) params.onFeed = true;
    if(this.type) params.type = this.type;
    const faqsResponse = await getFaqs(params);
    try {
      runInAction(() => {
        this.faqsList = faqsResponse.items;
        this.faqLoading = false;
      });
    } catch (err) {
      this.faqsList = err;
      this.faqLoading = false;
    }
    return this.faqsList
  };

  addFaq = async (data) => {
    this.faqLoading = true;
    const faqResponse = await addFaq(data);
    try {
      runInAction(() => {
        this.faq = faqResponse;
        this.getFaqs().then(() => {
          this.faqLoading = false;
        });
      });
    } catch (err) {
      this.faq = err;
      this.faqLoading = false;
    }
    return this.faq
  };

  updateFaq = async (id, data) => {
    this.faqLoading = true;
    const updateResponse = await updateFaq(id, data);
    try {
      runInAction(() => {
        this.faq = updateResponse;
        this.getFaqs().then(() => {
          this.faqLoading = false;
        });
      });
    } catch (err) {
      this.faq = err;
      this.faqLoading = false;
    }
    return this.faq
  }

  setVisible = async (id, data) => {
    this.faqLoading = true;
    const updateResponse = await setVisible(id, data);
    try {
      runInAction(() => {
        this.faqResponse = updateResponse;
        this.getFaqs().then(() => {
          this.faqLoading = false;
        });
      });
    } catch (err) {
      this.faqResponse = err;
      this.faqLoading = false;
    }
    return this.faqResponse
  }

  deleteFaq = async (id) => {
    this.faqLoading = true;
    const deleteResponse = await deleteFaq(id);
    try {
      runInAction(() => {
        this.faqResponse = deleteResponse;
        this.getFaqs().then(() => {
          this.faqLoading = false;
        });
      });
    } catch (err) {
      this.faqResponse = err;
      this.faqLoading = false;
    }
    return this.faqResponse
  }

};

decorate(ObservableFaqsStore, {
  faqsList: observable,
  faq: observable,
  visible: observable,
  faqResponse: observable,
  faqLoading: observable,
  faqError: observable,
});
export default new ObservableFaqsStore();
