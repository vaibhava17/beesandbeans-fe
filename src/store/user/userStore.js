import { decorate, observable, runInAction } from "mobx";
import {
  userLogin,
  userSignup,
  getUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
  addVisitor,
  getVisitorCount,
} from "../../service/userService"
import { cookie } from "../../utils/cookie";
import { AUTH_TOKEN, AUTH_USER } from "../../constants/initial"

class ObservableUserStore {
  user = undefined;
  token = undefined;
  response = undefined;
  usersList = [];
  totalVisitors = 0;
  uniqueVisitors = 0;
  visitorsList = [];
  loading = false;

  current = 1;
  pageSize = 10;
  search = "";
  sortField = "createdAt";
  sortOrder = "desc";
  total = 0;
  totalPages = 0;

  setPage = (page) => {
    this.current = page;
    this.getAllUsers();
  };

  setPageSize = (pageSize) => {
    this.pageSize = pageSize;
    this.getAllUsers();
  };

  setSearch = (search) => {
    this.search = search;
    this.getAllUsers();
  };

  setSort = (data) => {
    this.sortField = data.field;
    this.sortOrder = data.sort;
    this.getAllUsers();
  };

  getAllUsers = async () => {
    this.loading = true;
    const params = {};
    if (this.search) params.search = this.search;
    if (this.current) params.current = this.current;
    if (this.pageSize) params.pageSize = this.pageSize;
    if (this.sortField) params.sortField = this.sortField;
    if (this.sortOrder) params.sortOrder = this.sortOrder;
    const usersResponse = await getAllUsers(params);
    try {
      runInAction(() => {
        this.usersList = usersResponse.items;
        this.total = usersResponse.total;
        this.pageSize = usersResponse.pageSize;
        this.totalPages = usersResponse.totalPages;
        this.current = usersResponse.current;
        this.loading = false;
      });
    } catch (error) {
      this.usersList = error;
      this.loading = false;
    }
    return this.usersList;
  };

  getUserById = async (id) => {
    this.loading = true;
    const userResponse = await getUserById(id);
    try {
      runInAction(() => {
        this.user = userResponse.data;
        this.loading = false;
      });
    } catch (error) {
      this.user = error;
      this.loading = false;
    }
    return this.user;
  };

  updateUserById = async (data, id) => {
    this.loading = true;
    const userResponse = await updateUserById(data, id);
    try {
      runInAction(() => {
        this.user = userResponse;
        this.loading = false;
      });
    } catch (error) {
      this.user = error;
      this.loading = false;
    }
    return this.user;
  };

  deleteUser = async (id) => {
    this.loading = true;
    const deleteResponse = await deleteUser(id);
    try {
      runInAction(() => {
        this.response = deleteResponse;
        this.loading = false;
      });
    } catch (error) {
      this.response = error;
      this.loading = false;
    }
    return this.response;
  };

  userLogin = async (data) => {
    this.loading = true;
    const loginResponse = await userLogin(data);
    try {
      runInAction(() => {
        this.user = loginResponse;
        this.token = loginResponse.token;
        cookie.set(AUTH_USER, this.user.email);
        cookie.set(AUTH_TOKEN, this.user.token);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.token = undefined;
        this.user = error;
        this.loading = false;
      });
    };
    return this.user;
  };

  userLogout = () => {
    runInAction(() => {
      this.user = undefined;
      this.token = undefined;
      cookie.erase(AUTH_TOKEN);
      cookie.erase(AUTH_USER);
    });
  };

  userSignup = async (data) => {
    this.loading = true;
    const signUpResponse = await userSignup(data);
    try {
      runInAction(() => {
        this.user = signUpResponse;
        this.token = signUpResponse.token;
        cookie.set(AUTH_USER, this.user.email);
        cookie.set(AUTH_TOKEN, this.user.token);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.user = error;
        this.token = undefined;
        cookie.erase(AUTH_TOKEN);
        cookie.erase(AUTH_USER);
        this.loading = false;
      });
    };
    return this.user;
  };

  getUserProfile = async () => {
    this.loading = true;
    const profileResponse = await getUserProfile();
    try {
      runInAction(() => {
        this.user = profileResponse.data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.user = error;
        this.loading = false;
      });
    };
    return this.user;
  };

  addVisitor = async (data) => {
    this.loading = true;
    const visitorResponse = await addVisitor(data);
    try {
      runInAction(() => {
        this.response = visitorResponse;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.response = error;
        this.loading = false;
      });
    };
    return this.response;
  };

  getVisitorCount = async () => {
    this.loading = true;
    const visitorCountResponse = await getVisitorCount();
    try {
      runInAction(() => {
        this.visitorsList = visitorCountResponse.items;
        this.totalVisitors = visitorCountResponse.data.count;
        this.uniqueVisitors = visitorCountResponse.data.unique;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.visitorsList = error;
        this.loading = false;
      });
    };
    return this.visitorsList;
  };

}

decorate(ObservableUserStore, {
  user: observable,
  token: observable,
  loading: observable,
  response: observable,
  usersList: observable,
  totalVisitors: observable,
  uniqueVisitors: observable,
  visitorsList: observable,

  current: observable,
  pageSize: observable,
  search: observable,
  sortField: observable,
  sortOrder: observable,
  total: observable,
  totalPages: observable,
});
export default new ObservableUserStore();
