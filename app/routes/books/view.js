import Route from '@ember/routing/route';
import ENV from 'frontend/config/environment';
import axios from 'axios';

export default class BooksViewRoute extends Route {
  async model(params) {
    const { API_BASE_URL } = ENV.APP;
    const { id } = params;
    const url = new URL(`${API_BASE_URL}/books/${id}`);
    url.searchParams.append('filter[include]', 'author');
    return await axios
      .get(url.toString())
      .then((res) => res.data)
      .catch(() => null);
  }
}
