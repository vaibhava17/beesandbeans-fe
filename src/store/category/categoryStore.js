import { decorate, observable, runInAction } from "mobx";
import { getAllCategories, addCategory, updateCategory, getCategoryById, deleteCategory } from "../../service/categoryService"

class ObservableCategoriesStore {
  categoriesList = [];
  productCategories = [];
  blogCategories = [];
  category = null;
  categoryResponse = undefined;
  categoryLoading = false;
  categoryId = null;

  setCategoryId = (id) => {
    this.categoryId = id;
  }

  getAllCategories = async (params) => {
    this.categoryLoading = true;
    const categoriesResponse = await getAllCategories(params);
    try {
      runInAction(() => {
        this.categoriesList = categoriesResponse.items;
        this.categoryLoading = false;
      });
    } catch (err) {
      this.categoriesList = err;
      this.categoryLoading = false;
    }
    return this.categoriesList
  };

  getProductCategories = async () => {
    this.categoryLoading = true;
    const categoriesResponse = await getAllCategories({ type: "product" });
    try {
      runInAction(() => {
        this.productCategories = categoriesResponse.items;
        this.categoryLoading = false;
      });
    } catch (err) {
      this.productCategories = err;
      this.categoryLoading = false;
    }
    return this.productCategories
  }

  getBlogCategories = async () => {
    this.categoryLoading = true;
    const categoriesResponse = await getAllCategories({ type: "blog" });
    try {
      runInAction(() => {
        this.blogCategories = categoriesResponse.items;
        this.categoryLoading = false;
      });
    } catch (err) {
      this.blogCategories = err;
      this.categoryLoading = false;
    }
    return this.blogCategories
  }

  addCategory = async (data) => {
    this.categoryLoading = true;
    const categoryResponse = await addCategory(data);
    try {
      runInAction(() => {
        this.category = categoryResponse.data;
        if (this.category.type === "product") {
          this.getProductCategories();
        } else if (this.category.type === "blog") {
          this.getBlogCategories();
        }
        this.categoryLoading = false;
      });
    } catch (err) {
      this.category = err;
      this.categoryLoading = false;
    }
    return this.category
  };

  updateCategory = async (data, id) => {
    this.categoryLoading = true
    const categoryResponse = await updateCategory(data, id);
    try {
      runInAction(() => {
        this.category = categoryResponse;
        this.getAllCategories().then(() => {
          this.categoryLoading = false;
        });
      });
    } catch (err) {
      this.category = err;
      this.categoryLoading = false;
    }
    return this.category
  };

  getCategoryById = async (id) => {
    this.categoryLoading = true;
    const categoryResponse = await getCategoryById(id);
    try {
      runInAction(() => {
        this.category = categoryResponse.data;
        this.categoryLoading = false;
      })
    } catch (err) {
      this.category = err;
      this.categoryLoading = false;
    }
    return this.category
  }

  deleteCategory = async (id) => {
    this.categoryLoading = true;
    const deleteResponse = await deleteCategory(id);
    try {
      runInAction(() => {
        this.categoryResponse = deleteResponse;
        this.getProductCategories();
        this.getBlogCategories();
      });
    } catch (err) {
      this.categoryResponse = err;
      this.categoryLoading = false;
    };
    return this.categoryResponse
  };
};

decorate(ObservableCategoriesStore, {
  categoriesList: observable,
  productCategories: observable,
  blogCategories: observable,
  category: observable,
  categoryResponse: observable,
  categoryLoading: observable,
  categoryId: observable,
});
export default new ObservableCategoriesStore();
