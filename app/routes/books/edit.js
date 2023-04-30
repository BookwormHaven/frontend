import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend/config/environment';
import axios from 'axios';

export default class BooksEditRoute extends Route {
  @service bookStorage;
  @service router;
  authors = null;

  async beforeModel() {
    // redirect home if path is loaded directly
    if (this.bookStorage.editData === null) {
      this.router.transitionTo('index');
    }
    this.authors = await this.getAuthors();
  }

  async model() {
    const { editData } = this.bookStorage;
    return {
      editData,
      authors: this.authors,
    };
  }

  async getAuthors() {
    const { API_BASE_URL } = ENV.APP;
    const requestUrl = new URL(`${API_BASE_URL}/authors`);
    requestUrl.searchParams.append('filter[fields][name]', true);
    requestUrl.searchParams.append('filter[fields][id]', true);
    requestUrl.searchParams.append('filter[order]', 'name ASC'); // sorted names

    const data = await axios
      .get(requestUrl.toString())
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return null;
      });
    return data;
  }
}
