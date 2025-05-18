// Yandex.js
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  static getToken() {
    const token = localStorage.getItem('yandex_token');
    if (token) return token;
    
    const newToken = prompt('Введите токен Яндекс.Диска');
    if (newToken) {
      localStorage.setItem('yandex_token', newToken);
      return newToken;
    }
    return null;
  }

  static uploadFile(path, url, callback) {
    const token = this.getToken();
    if (!token) {
      callback(new Error('No Yandex token provided'), null);
      return;
    }

    createRequest({
      method: 'POST',
      url: `${this.HOST}/resources/upload`,
      headers: {
        'Authorization': `OAuth ${token}`
      },
      data: {
        path: path,
        url: url
      },
      callback: callback
    });
  }

  static removeFile(path, callback) {
    const token = this.getToken();
    if (!token) {
      callback(new Error('No Yandex token provided'), null);
      return;
    }

    createRequest({
      method: 'DELETE',
      url: `${this.HOST}/resources`,
      headers: {
        'Authorization': `OAuth ${token}`
      },
      data: {
        path: path
      },
      callback: callback
    });
  }

  static getUploadedFiles(callback) {
    const token = this.getToken();
    if (!token) {
      callback(new Error('No Yandex token provided'), null);
      return;
    }

    createRequest({
      method: 'GET',
      url: `${this.HOST}/resources/files`,
      headers: {
        'Authorization': `OAuth ${token}`
      },
      callback: callback
    });
  }

  static downloadFileByUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}