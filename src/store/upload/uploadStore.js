import { decorate, observable, runInAction } from "mobx";
import { uploadImage, uploadImages, deleteImage } from "../../service/uploadService"

class ObservableUploadsStore {
  imagesList = [];
  imageName = null;
  image = null;
  response = undefined;
  loading = false;
  error = undefined;

  setValue = (key, value) => {
    this[key] = value;
  }
  
  uploadImage = async (data) => {
    this.loading = true;
    const uploadResponse = await uploadImage(data);
    try {
      runInAction(() => {
        this.response = uploadResponse;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.response || this.error
  };

  uploadImages = async (data) => {
    this.loading = true;
    const uploadResponse = await uploadImages(data);
    try {
      runInAction(() => {
        this.response = uploadResponse;
        this.loading = false;
      });
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.response || this.error
  }

  deleteImage = async (data) => {
    this.loading = true;
    const deleteResponse = await deleteImage(data);
    try {
      runInAction(() => {
        this.response = deleteResponse;
        this.loading = false;
      });
    }
    catch (err) {
      this.error = err;
      this.loading = false;
    }
    return this.response || this.error
  }
};

decorate(ObservableUploadsStore, {
  imagesList: observable,
  imageName: observable,
  image: observable,
  response: observable,
  loading: observable,
  error: observable,
});
export default new ObservableUploadsStore();
