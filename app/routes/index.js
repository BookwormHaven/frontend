import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }
      const { data } = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
