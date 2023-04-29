import Route from '@ember/routing/route';
import ENV from 'frontend/config/environment';
import axios from 'axios';
import { service } from '@ember/service';

export default class BooksViewRoute extends Route {
  @service router;

  async model(params) {
    const { API_BASE_URL } = ENV.APP;
    const { id } = params;
    const url = new URL(`${API_BASE_URL}/books/${id}`);
    url.searchParams.append('filter[include]', 'author');
    const data = await axios
      .get(url.toString())
      .then((res) => res.data)
      .catch(() => null);

    return {
      data,
      deleteBook: this.deleteBook.bind(this),
    };
  }

  deleteBook() {
    const { id } = this.currentModel.data;
    const { API_BASE_URL } = ENV.APP;
    const url = new URL(`${API_BASE_URL}/books/${id}`);

    axios
      .delete(url)
      .then(() => {
        alert('Book has been successfully deleted.');
        this.router.transitionTo('index');
      })
      .catch(() => {
        alert('An error occured when deleting the book.');
      });
  }
}
