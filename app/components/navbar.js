import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @tracked isCollapsed = true;

  @action toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  @action closeMenu() {
    this.isCollapsed = true;
  }
}
