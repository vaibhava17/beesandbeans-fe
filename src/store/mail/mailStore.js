import { decorate, observable, runInAction } from "mobx";
import { getAllMails, addMail, markMail, getMailById, deleteMail } from "../../service/mailService"

class ObservableMailsStore {
  mailsList = [];
  mail = null;
  loading = false;
  response = undefined;
  error = undefined;

  current = 1;
  pageSize = 10;
  search = "";
  sortField = "createdAt";
  sortOrder = "desc";
  total = 0;
  totalPages = 0;
  type = "";

  setPage = (page) => {
    this.current = page;
    this.getAllMails();
  };

  setPageSize = (pageSize) => {
    this.pageSize = pageSize;
    this.getAllMails();
  };

  setSearch = (search) => {
    this.search = search;
    this.getAllMails();
  };

  setSort = (data) => {
    this.sortField = data.field;
    this.sortOrder = data.sort;
    this.getAllMails();
  };

  setType = (type) => {
    this.type = type;
    this.getAllMails();
  }

  getAllMails = async () => {
    this.loading = true;
    const params = {};
    if (this.search) params.search = this.search;
    if (this.current) params.current = this.current;
    if (this.pageSize) params.pageSize = this.pageSize;
    if (this.sortField) params.sortField = this.sortField;
    if (this.sortOrder) params.sortOrder = this.sortOrder;
    if (this.type) params.type = this.type;
    const mailsResponse = await getAllMails(params);
    try {
      runInAction(() => {
        this.mailsList = mailsResponse.items;
        this.total = mailsResponse.total;
        this.pageSize = mailsResponse.pageSize;
        this.totalPages = mailsResponse.totalPages;
        this.current = mailsResponse.current;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.mailsList || this.error
  };

  addMail = async (data) => {
    this.loading = true;
    const mailResponse = await addMail(data);
    try {
      runInAction(() => {
        this.mail = mailResponse;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.mail || this.error
  };

  markMail = async (data, id) => {
    this.loading = true
    const mailResponse = await markMail(data, id);
    try {
      runInAction(() => {
        this.response = mailResponse;
        this.getAllMails().then(() => {
          this.loading = false;
        });
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.response || this.error
  };

  getMailById = async (id) => {
    this.loading = true;
    const mailResponse = await getMailById(id);
    try {
      runInAction(() => {
        this.mail = mailResponse.data;
        this.loading = false;
      })
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.mail || this.error
  }

  deleteMail = async (id) => {
    this.loading = true;
    const deleteResponse = await deleteMail(id);
    try {
      runInAction(() => {
        this.response = deleteResponse;
        this.getAllMails();
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    };
    return this.response || this.error;
  };
};

decorate(ObservableMailsStore, {
  mailsList: observable,
  mail: observable,
  response: observable,
  loading: observable,
  error: observable,
  current: observable,
  pageSize: observable,
  search: observable,
  sortField: observable,
  sortOrder: observable,
  total: observable,
  totalPages: observable,
  type: observable,
});
export default new ObservableMailsStore();
