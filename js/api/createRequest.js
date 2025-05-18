// createRequest.js
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
  
    let url = options.url;
    const method = options.method || 'GET';
    const headers = options.headers || {};
    const callback = options.callback;
    const data = options.data;
  
    if (method === 'GET' && data) {
      const queryString = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      url += `?${queryString}`;
    }
  
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(null, xhr.response);
      } else {
        callback(new Error(`Request failed with status ${xhr.status}`), null);
      }
    };
  
    xhr.onerror = () => {
      callback(new Error('Network error'), null);
    };
  
    try {
      xhr.open(method, url);
      
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
  
      if (method !== 'GET' && data) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    } catch (err) {
      callback(err, null);
    }
  };