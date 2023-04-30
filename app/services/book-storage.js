import Service from '@ember/service';

export default class BookStorageService extends Service {
  editData = null;

  get editData() {
    return this.editData;
  }

  set editData(book) {
    this.editData = book;
  }
}
