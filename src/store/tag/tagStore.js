import { decorate, observable, runInAction } from "mobx";
import { getTags, addTag, deleteTag } from "../../service/tagService"

class ObservableTagsStore {
  tagsList = [];
  tag = null;
  response = undefined;
  tagLoading = false;
  error = undefined;

  getTags = async () => {
    this.tagLoading = true;
    const tagsResponse = await getTags();
    try {
      runInAction(() => {
        this.tagsList = tagsResponse.items;
        this.tagLoading = false;
      });
    } catch (err) {
      this.error = err;
      this.tagLoading = false;
    }
    return this.tagsList || this.error
  };

  addTag = async (data) => {
    this.tagLoading = true;
    const tagResponse = await addTag(data);
    try {
      runInAction(() => {
        this.tag = tagResponse;
        this.getTags().then(() => {
          this.tagLoading = false;
        });
      });
    } catch (err) {
      this.error = err;
      this.tagLoading = false;
    }
    return this.tag || this.error
  };

  deleteTag = async (id) => {
    this.tagLoading = true;
    const deleteResponse = await deleteTag(id);
    try {
      runInAction(() => {
        this.response = deleteResponse;
        this.getTags().then(() => {
          this.tagLoading = false;
        });
      });
    } catch (err) {
      this.error = err;
      this.tagLoading = false;
    };
    return this.response || this.error;
  };
};

decorate(ObservableTagsStore, {
  tagsList: observable,
  tag: observable,
  response: observable,
  tagLoading: observable,
  error: observable,
});
export default new ObservableTagsStore();
