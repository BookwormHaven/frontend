import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BooksIndexRoute extends Route {
  @service router;

  beforeModel() {
    this.router.transitionTo('index');
  }
}
