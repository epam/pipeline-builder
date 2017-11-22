import sinon from 'sinon';
import { expect } from 'chai';

import $http from '../../src/dataServices/data-services';

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
    $http('get', 'test_url');
    expect(requests[0].method).to.be.equal('get');
    expect(requests[0].url).to.be.equal('test_url');
  });

  it('resolves as promised with JSON data', () => {
    const data = { foo: 'bar' };
    const dataJson = JSON.stringify(data);

    const promise = $http('get', 'test_url', data);

    requests[0].respond(200, { 'Content-Type': 'text' }, dataJson);

    return promise.then((result) => {
      expect(result).to.be.equal(dataJson);
    });
  });

  it('resolves as promised with string data', () => {
    const promise = $http('get', 'test_url', 'data');

    requests[0].respond(200, { 'Content-Type': 'text' }, 'data');

    return promise.then((data) => {
      expect(data).to.be.equal('data');
    });
  });
});
