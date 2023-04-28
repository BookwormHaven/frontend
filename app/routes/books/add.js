import Route from '@ember/routing/route';
import ENV from 'frontend/config/environment';
import axios from 'axios';

export default class BooksAddRoute extends Route {
  async model() {
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
