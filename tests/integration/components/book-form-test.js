import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | book-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it has correct maximum year', async function (assert) {
    await render(hbs`<BookForm />`);
    assert.dom('#add-year').hasProperty('max', `${new Date().getFullYear()}`);
  });

  test('it loads edit data', async function (assert) {
    const authors = [
      {
        id: 1,
        name: 'Charles Dickens',
        biography: 'Charles Dickens was an English writer and social critic...',
      },
    ];

    const book = {
      title: 'A Tale of Two Cities',
      publisher: 'Chapman & Hall',
      year: 1859,
      authorId: 1,
      author: authors[0],
    };

    this.set('book', book);
    this.set('authors', authors);
    await render(hbs`<BookForm 
      @book={{this.book}} 
      @authors={{this.authors}} 
    />`);

    assert.dom('#add-title').hasValue(book.title);
    assert.dom('#add-publisher').hasValue(book.publisher);
    assert.dom('#add-year').hasValue(`${book.year}`);
    assert.dom('#add-author-select').hasValue(`${book.author.id}`);
  });
});
