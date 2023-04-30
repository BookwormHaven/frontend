import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | book-preview', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders preview card details correctly', async function (assert) {
    this.set('author', { name: 'J.K. Rowling' });
    this.set('title', "Harry Potter and the Philosopher's Stone");
    this.set('id', 5);
    await render(hbs`<BookPreview 
      @title={{this.title}}
      @author={{this.author}}
      @id={{this.ids}}
    />`);

    assert
      .dom('.card-title')
      .hasText("Harry Potter and the Philosopher's Stone");
    assert.dom('.card-subtitle').hasText('By J.K. Rowling');
  });
});
