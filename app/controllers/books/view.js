import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BooksViewController extends Controller {
  @service bookStorage;
  @service router;
  queryParams = ['id'];
  @tracked id = null;

  @action editBook() {
    this.bookStorage.editData = this.model.data;
    this.router.transitionTo('books.edit');
  }

  @action deleteBook() {
    const { data } = this.model;
    const { title } = data;
    const res = confirm(`Are you sure you want to delete the book "${title}"?`);
    if (!res) return;
    this.model.deleteBook();
  }
}
