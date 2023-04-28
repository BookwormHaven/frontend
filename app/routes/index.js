import Route from '@ember/routing/route';
import ENV from 'frontend/config/environment';
import axios from 'axios';

export default class IndexRoute extends Route {
  async model() {
    const { API_BASE_URL } = ENV.APP;
    const requestUrl = new URL(`${API_BASE_URL}/books`);
    requestUrl.searchParams.append('filter[include]', 'author');
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
