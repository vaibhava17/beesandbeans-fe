import { decorate, observable, runInAction } from "mobx";
import {
  getProducts,
  getProductLists,
  likeProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setOnFeed,
  setInStock,
  getProductsStats,
  getProductById,
} from "../../service/productService"
import _ from "lodash";
import * as mobx from "mobx";

class ObservableProductsStore {
  productsList = [];
  productsByLikes = [];
  productsByRecent = [];
  productsByBestSeller = [];
  product = null;
  productsStats = null;

  productsLoading = false;
  productsResponse = undefined;

  current = 1;
  pageSize = 12;
  search = undefined;
  category = undefined;
  sortField = "createdAt";
  sortOrder = "desc";
  total = 0;
  totalPages = 0;
  onFeed = undefined;
  priceRange = undefined;

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

  setPriceRange = (priceRange) => {
    this.priceRange = priceRange;
  }

  setSortOrder = (data) => {
    this.sortField = data.field;
    this.sortOrder = data.order;
  };

  // Get all products list
  getAllProducts = async (isAdd, withoutLimit) => {
    this.productsLoading = true;
    const params = {
      current: isAdd ? this.current + 1 : this.current,
      pageSize: withoutLimit ? undefined : this.pageSize,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    };
    if (withoutLimit) params.noPaging = true;
    if (this.onFeed) params.onFeed = this.onFeed;
    if (this.search) params.search = this.search;
    if (this.category) params.category = this.category;
    if (this.priceRange) params.priceRange = this.priceRange;
    const productsResponse = await getProducts(params);
    try {
      runInAction(() => {
        this.productsList = isAdd
          ? _.uniq(_.concat(mobx.toJS(this.productsList), productsResponse.items || []), "_id")
          : _.uniq(productsResponse.items || [], "_id");
        this.total = productsResponse.total;
        this.pageSize = productsResponse.pageSize;
        this.totalPages = productsResponse.totalPages;
        this.current = productsResponse.current;
        this.productsLoading = false;
      });
    } catch (err) {
      this.productsList = err;
      this.productsLoading = false;
    }
    return this.productsList;
  };

  // Get products list by likes, recent and best seller
  getProductLists = async () => {
    this.productsLoading = true;
    const productsResponse = await getProductLists();
    try {
      runInAction(() => {
        this.productsByLikes = productsResponse.mostLikedProduct;
        this.productsByRecent = productsResponse.mostRecentProducts;
        this.productsByBestSeller = productsResponse.bestSellerProduct;
        this.productsResponse = productsResponse.succuss;
        this.productsLoading = false;
      });
    } catch (err) {
      this.productsResponse = err;
      this.productsLoading = false;
    }
    return this.productsResponse
  }

  // add product 
  addProduct = async (data) => {
    this.productsLoading = true;
    const productResponse = await addProduct(data);
    try {
      runInAction(() => {
        this.product = productResponse;
        this.productsLoading = false;
      });
    } catch (err) {
      this.product = err;
      this.productsLoading = false;
    }
    return this.product
  };

  // update product
  updateProduct = async (data, id) => {
    this.productsLoading = true
    const productResponse = await updateProduct(data, id);
    try {
      runInAction(() => {
        this.product = productResponse;
        this.productsLoading = false;
      });
    } catch (err) {
      this.product = err;
      this.productsLoading = false;
    }
    return this.product
  };

  // get product details by id
  getProductById = async (id) => {
    this.productsLoading = true;
    const productResponse = await getProductById(id);
    try {
      runInAction(() => {
        this.product = productResponse.data;
        this.productsLoading = false;
      })
    } catch (err) {
      this.product = err;
      this.productsLoading = false;
    }
    return this.product
  }

  // delete product
  deleteProduct = async (id) => {
    this.productsLoading = true;
    const deleteResponse = await deleteProduct(id);
    try {
      runInAction(() => {
        this.productsResponse = deleteResponse;
        this.getAllProducts();
        this.productsLoading = false;
      });
    } catch (err) {
      this.productsResponse = err;
      this.productsLoading = false;
    };
    return this.productsResponse;
  };

  // like a product
  likeProduct = async (id) => {
    this.productsLoading = true;
    const likeResponse = await likeProduct(id);
    try {
      runInAction(() => {
        this.product = likeResponse.data;
        this.productsLoading = false;
      });
    } catch (err) {
      this.product = err;
      this.productsLoading = false;
    }
    return this.product
  };

  // set product on feed
  setOnFeed = async (id) => {
    this.productsLoading = true;
    const onFeedResponse = await setOnFeed(id);
    try {
      runInAction(() => {
        this.product = onFeedResponse.data;
        this.productsLoading = false;
      });
    } catch (err) {
      this.product = err;
      this.productsLoading = false;
    }
    return this.product
  };

  // set product in stock
  setInStock = async (id) => {
    this.productsLoading = true;
    const inStockResponse = await setInStock(id);
    try {
      runInAction(() => {
        this.product = inStockResponse.data;
        this.productsLoading = false;
      });
    } catch (err) {
      this.product = err;
      this.productsLoading = false;
    }
    return this.product
  };

  // get products stats
  getProductsStats = async () => {
    this.productsLoading = true;
    const statsResponse = await getProductsStats();
    try {
      runInAction(() => {
        this.productsStats = statsResponse.data;
        this.productsLoading = false;
      });
    } catch (err) {
      this.productsStats = err;
      this.productsLoading = false;
    }
    return this.productsStats
  };
};

decorate(ObservableProductsStore, {
  productsList: observable,
  productsByLikes: observable,
  productsByRecent: observable,
  productsByBestSeller: observable,
  product: observable,
  productsResponse: observable,
  productsLoading: observable,
  current: observable,
  pageSize: observable,
  search: observable,
  category: observable,
  sortField: observable,
  sortOrder: observable,
  total: observable,
  totalPages: observable,
  priceRange: observable,
  productsStats: observable,
});
export default new ObservableProductsStore();
