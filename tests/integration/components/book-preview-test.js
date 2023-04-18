import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | book-preview', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders preview card details correctly', async function (assert) {
    this.set('author', '');
    this.set('title', "Harry Potter and the Philosopher's Stone");
    await render(
      hbs`<BookPreview 
        @title="Harry Potter and the Philosopher's Stone" 
        @author='J.K. Rowling'
      />`
    );

    assert
      .dom('.card-title')
      .hasText("Harry Potter and the Philosopher's Stone");
    assert.dom('.card-subtitle').hasText('J.K. Rowling');
  });
});
