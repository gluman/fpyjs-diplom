/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
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

  /**
   * Метод загрузки файла в облако
   */
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

  /**
   * Метод удаления файла из облака
   */
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

  /**
   * Метод получения всех загруженных файлов в облаке
   */
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

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}