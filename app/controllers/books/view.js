import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class BooksViewController extends Controller {
  queryParams = ['id'];
  @tracked id = null;
}
