import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import ENV from 'frontend/config/environment';
import axios from 'axios';

export default class BookFormComponent extends Component {
  @service router;
  @tracked requireBiography = false;
  @tracked errorMessage = null;
  @tracked isLoading = false;
  authorId = -1;

  get currentYear() {
    return new Date().getFullYear();
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

    const bookData = {
      title: bookTitle,
      publisher: bookPublisher,
      year: bookYear,
      authorId: this.authorId,
    };

    this.isLoading = true;
    await axios.post(`${API_BASE_URL}/books`, bookData).catch((err) => {
      this.errorMessage = err.response.data.error.message;
    });
    this.isLoading = false;
    this.router.transitionTo('index');
  }
}
