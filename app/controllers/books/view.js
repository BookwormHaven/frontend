import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BooksViewController extends Controller {
  queryParams = ['id'];
  @tracked id = null;

  @action editBook() {
    console.log('edit');
  }

  @action deleteBook() {
    const { data } = this.model;
    const { title } = data;
    const res = confirm(`Are you sure you want to delete the book "${title}"?`);
    if (!res) return;
    this.model.deleteBook();
  }
}
