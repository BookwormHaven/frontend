import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'frontend/tests/helpers';

module('Acceptance | bookworm haven', function (hooks) {
  setupApplicationTest(hooks);

  test('navigating with the navbar', async function (assert) {
    await visit('/');

    assert.dom('.navbar').exists();
    assert.dom('.navbar__link--brand').hasText('Bookworm Haven');
    assert.dom('.navbar__link--index').hasText('Home');
    assert.dom('.navbar__link--add').hasText('Add a book');

    await click('.navbar__link--add');
    assert.strictEqual(currentURL(), '/books/add');

    await click('.navbar__link--brand');
    assert.strictEqual(currentURL(), '/');

    await click('.navbar__link--index');
    assert.strictEqual(currentURL(), '/');
  });

  test('redirects /books to home', async function (assert) {
    await visit('/books');
    await Promise.resolve(setTimeout(() => {}, 50));
    assert.strictEqual(currentURL(), '/');
  });

  test('displays 404 page', async function (assert) {
    await visit('/invalid');
    assert.dom('h3').hasText('Page not found');
  });
});
