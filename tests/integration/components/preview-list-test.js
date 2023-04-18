import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | preview-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with correct heading', async function (assert) {
    await render(hbs`<PreviewList @heading="heading123"/>`);
    assert.dom('h3').hasText('heading123');
  });

  test('it renders with child components', async function (assert) {
    await render(hbs`
      <PreviewList @heading="test">
        <p>child</p>
      </PreviewList>
    `);

    assert.dom('p').hasText('child');
  });
});
