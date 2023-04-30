import { module, test } from 'qunit';
import { setupTest } from 'frontend/tests/helpers';

module('Unit | Service | bookStorage', function (hooks) {
  setupTest(hooks);

  test('it is initially null', function (assert) {
    const service = this.owner.lookup('service:book-storage');
    assert.strictEqual(service.editData, null);
  });

  test('it holds data', function (assert) {
    const service = this.owner.lookup('service:book-storage');
    const data = {
      foo: 'bar',
      obj: {
        hello: 'world',
      },
    };
    service.editData = data;
    assert.deepEqual(service.editData, data);
  });
});
