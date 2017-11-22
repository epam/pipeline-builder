export default function $http(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => (xhr.status !== 200 ? reject(xhr.response) : resolve(xhr.response)));
    xhr.addEventListener('error', e => reject(e));
    xhr.addEventListener('abort', e => reject(e));
    xhr.open(method, url);

    xhr.responseType = 'text';

    switch (true) {
      case data === undefined:
        return xhr.send();
      case typeof data === 'string':
        return xhr.send(data);
      default:
        xhr.setRequestHeader('Content-Type', 'application/json');
        return xhr.send(JSON.stringify(data));
    }
  });
}
