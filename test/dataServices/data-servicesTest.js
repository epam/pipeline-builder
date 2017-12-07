import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import DataService from '../../src/dataServices/data-services';

chai.use(chaiAsPromised);
const { expect } = chai;

let requests = [];

describe('data-services $http', () => {
  let xhr;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr;
    requests = [];
    xhr.onCreate = (request) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  it('resolves as promised', () => {
    const promise = DataService.get('test_url');
    requests[0].respond(200, { 'Content-Type': 'text' }, 'OK');
    return Promise.all([
      expect(promise).to.be.fulfilled,
      expect(requests[0].method).to.be.equal('get'),
      expect(requests[0].url).to.be.equal('test_url'),
      expect(promise).to.eventually.deep.equal('OK'),
    ]);
  });

  it('reject when response status 404 promised', () => {
    const promise = DataService.get('test_url');
    requests[0].respond(404, { 'Content-Type': 'text' }, 'Not found');
    return Promise.all([
      expect(promise).to.be.rejected,
      expect(requests[0].method).to.be.equal('get'),
      expect(requests[0].url).to.be.equal('test_url'),
    ]);
  });

  it('xhr error as promised', () => {
    const promise = DataService.get('test_url');
    requests[0].respond(0, { 'Content-Type': 'text' }, 'OK');
    return Promise.all([
      expect(promise).to.be.rejected.and.eventually.have.property('type', 'error'),
      expect(requests[0].method).to.be.equal('get'),
      expect(requests[0].url).to.be.equal('test_url'),
    ]);
  });

  it('xhr abort as promised', () => {
    const promise = DataService.get('test_url');
    requests[0].abort();
    return Promise.all([
      expect(promise).to.be.rejected.and.eventually.have.property('type', 'abort'),
      expect(requests[0].method).to.be.equal('get'),
      expect(requests[0].url).to.be.equal('test_url'),
    ]);
  });

  it('resolves as promised with JSON data', () => {
    const data = { foo: 'bar' };
    const dataJson = JSON.stringify(data);

    const promise = DataService.get('test_url', data);

    requests[0].respond(200, { 'Content-Type': 'text' }, dataJson);

    return Promise.all([
      expect(promise).to.be.fulfilled,
      expect(requests[0].method).to.be.equal('get'),
      expect(requests[0].url).to.be.equal('test_url'),
      expect(promise).to.eventually.deep.equal(dataJson),
    ]);
  });

  it('resolves as promised with string data (get)', () => {
    const promise = DataService.get('test_url', 'data');

    requests[0].respond(200, { 'Content-Type': 'text' }, 'data');

    return Promise.all([
      expect(promise).to.be.fulfilled,
      expect(requests[0].method).to.be.equal('get'),
      expect(requests[0].url).to.be.equal('test_url'),
      expect(promise).to.eventually.deep.equal('data'),
    ]);
  });

  it('resolves as promised with string data (post)', () => {
    const promise = DataService.post('test_url', 'data');

    requests[0].respond(200, { 'Content-Type': 'text' }, 'data');

    return Promise.all([
      expect(promise).to.be.fulfilled,
      expect(requests[0].method).to.be.equal('post'),
      expect(requests[0].url).to.be.equal('test_url'),
      expect(promise).to.eventually.deep.equal('data'),
    ]);
  });
});
