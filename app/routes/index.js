import Route from '@ember/routing/route';
import ENV from 'frontend/config/environment';
import axios from 'axios';

export default class IndexRoute extends Route {
  async model() {
    const { API_BASE_URL } = ENV.APP;
    const requestUrl = new URL(`${API_BASE_URL}/books`);
    requestUrl.searchParams.append('filter[fields][title]', true);
    requestUrl.searchParams.append('filter[fields][authorId]', true);
    requestUrl.searchParams.append('filter[fields][id]', true);
    requestUrl.searchParams.append('filter[include]', 'author');
    requestUrl.searchParams.append('filter[order]', 'title ASC');

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
