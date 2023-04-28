import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | error-message', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders given message as error', async function (assert) {
    await render(hbs`<ErrorMessage @msg="hello world"/>`);
    assert.dom('p').hasText('Error: hello world');
  });
});
