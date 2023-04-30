import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import ENV from 'frontend/config/environment';
import axios from 'axios';

export default class BookFormComponent extends Component {
  @service router;
  @service bookStorage;
  @tracked requireBiography = false;
  @tracked errorMessage = null;
  @tracked isLoading = false;
  authorId = -1;

  @action initialYear(init) {
    return init ? init : new Date().getFullYear();
  }

  /**
   * Set the selected author to be the same as the book to be edited
   * @param {number} editAuthorId author id of the book to be edited
   */
  @action updateSelected(editAuthorId) {
    Array.from(document.querySelector('.form-select').children).forEach(
      (option) => {
        if (option.value === `${editAuthorId}`) option.selected = true;
      }
    );
  }

  @action updateBiographyStatus(event) {
    const id = event.target.value;
    this.requireBiography = id === 'other';
  }

  @action async onSubmit(event) {
    event.preventDefault();
    const form = event.target;

    // validate form data
    const { value: bookTitle } = form.querySelector('#add-title');
    const { value: bookPublisher } = form.querySelector('#add-publisher');
    const { value: bookYear } = form.querySelector('#add-year');
    const bookAuthorSelect = form.querySelector('#add-author-select');
    const bookAuthorName = form.querySelector('#add-author-name');
    const bookAuthorBio = form.querySelector('#add-author-bio');
    const isNewAuthor = bookAuthorSelect.value === 'other';

    if (!bookTitle) {
      return (this.errorMessage = 'Book title cannot be empty.');
    }
    if (!bookPublisher) {
      return (this.errorMessage = 'Book publisher cannot be empty.');
    }
    if (bookAuthorSelect.value === 'x') {
      return (this.errorMessage = 'Please select an author.');
    }
    // year validation in form field
    if (isNewAuthor) {
      if (!bookAuthorName.value) {
        return (this.errorMessage = "Author's name cannot be empty.");
      }
      // allow biography to be empty
    }
    this.errorMessage = null;

    // send data
    const { API_BASE_URL } = ENV.APP;

    // get new author id if new author is added
    if (isNewAuthor) {
      const { value: biography } = bookAuthorBio;
      const authorData = {
        name: bookAuthorName.value,
        ...(biography && { biography }),
      };
      this.isLoading = true;
      const newAuthorData = await axios
        .post(`${API_BASE_URL}/authors`, authorData)
        .then((res) => res.data)
        .catch((err) => {
          this.errorMessage = err.response.data.error.message;
        });
      this.isLoading = false;
      this.authorId = newAuthorData.id;
    } else {
      this.authorId = Number(bookAuthorSelect.value);
    }

    const isEdit = this.router.currentRouteName === 'books.edit';
    const { id: currentId } = this.bookStorage.editData;
    const bookData = {
      title: bookTitle,
      publisher: bookPublisher,
      year: bookYear,
      authorId: this.authorId,
      ...(isEdit && { id: currentId }),
    };

    this.isLoading = true;
    if (isEdit) {
      await axios
        .put(`${API_BASE_URL}/books/${currentId}`, bookData)
        .catch((err) => {
          this.errorMessage = err.response.data.error.message;
        });
    } else {
      await axios.post(`${API_BASE_URL}/books`, bookData).catch((err) => {
        this.errorMessage = err.response.data.error.message;
      });
    }
    this.isLoading = false;

    // user is redirected if bookData POST/PUT succeeds
    if (this.errorMessage === null) {
      this.router.transitionTo('index');
    }
  }
}
