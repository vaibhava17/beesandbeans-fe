import { decorate, observable, runInAction } from "mobx";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  likeBlog
} from "../../service/blogService"

class ObservableBlogsStore {
  blogsList = [];
  blog = null;

  loading = false;
  response = undefined;
  error = undefined;

  current = 1;
  pageSize = 10;
  search = "";
  category = "";
  sortField = "createdAt";
  sortOrder = "desc";
  total = 0;
  totalPages = 0;

  setPage = (page) => {
    this.current = page;
  };

  setPageSize = (pageSize) => {
    this.pageSize = pageSize;
  };

  setSearch = (search) => {
    this.search = search;
  };

  setCategory = (category) => {
    this.category = category;
  };

  setSort = (data) => {
    this.sortField = data.field;
    this.sortOrder = data.sort;
  };

  getAllBlogs = async () => {
    this.loading = true;
    const params = {};
    if (this.search) params.search = this.search;
    if (this.current) params.current = this.current;
    if (this.pageSize) params.pageSize = this.pageSize;
    if (this.sortField) params.sortField = this.sortField;
    if (this.sortOrder) params.sortOrder = this.sortOrder;
    if (this.category) params.category = this.category;
    const blogsResponse = await getAllBlogs(params);
    try {
      runInAction(() => {
        this.blogsList = blogsResponse.items;
        this.total = blogsResponse.total;
        this.pageSize = blogsResponse.pageSize;
        this.totalPages = blogsResponse.totalPages;
        this.current = blogsResponse.current;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.blogsList || this.error
  };

  addBlog = async (data) => {
    this.loading = true;
    const blogResponse = await addBlog(data);
    try {
      runInAction(() => {
        this.blog = blogResponse;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.blog || this.error
  };

  updateBlog = async (data, id) => {
    this.loading = true
    const blogResponse = await updateBlog(data, id);
    try {
      runInAction(() => {
        this.blog = blogResponse;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.blog || this.error
  };

  getBlogById = async (id) => {
    this.loading = true;
    const blogResponse = await getBlogById(id);
    try {
      runInAction(() => {
        this.blog = blogResponse.data;
        this.loading = false;
      })
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.blog || this.error
  }

  deleteBlog = async (id) => {
    this.loading = true;
    const deleteResponse = await deleteBlog(id);
    try {
      runInAction(() => {
        this.response = deleteResponse;
        this.getAllBlogs();
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    };
    return this.response || this.error;
  };

  likeBlog = async (id) => {
    this.loading = true;
    const likeResponse = await likeBlog(id);
    try {
      runInAction(() => {
        this.blog = likeResponse.data;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.blog || this.error
  };
};

decorate(ObservableBlogsStore, {
  blogsList: observable,
  blog: observable,
  response: observable,
  loading: observable,
  error: observable,
  current: observable,
  pageSize: observable,
  search: observable,
  category: observable,
  sortField: observable,
  sortOrder: observable,
  total: observable,
  totalPages: observable,
});
export default new ObservableBlogsStore();
