class VK {
  static ACCESS_TOKEN = null;
  static lastCallback = () => {};

  /**
   * Метод получения токена для VK API
   */
  static getToken() {
    if (this.ACCESS_TOKEN) return this.ACCESS_TOKEN;
    
    const newToken = prompt('Введите токен VK API');
    if (newToken) {
      this.ACCESS_TOKEN = newToken;
      return newToken;
    }
    return null;
  }

  static get(id = '', callback) {
    const token = this.getToken();
    if (!token) {
      alert('Необходимо ввести токен VK API');
      return;
    }

    this.lastCallback = callback;
    
    const script = document.createElement('script');
    const callbackName = `jsonp_${Date.now()}`;
    
    window[callbackName] = (response) => {
      this.processData(response);
      delete window[callbackName];
    };
    
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${token}&v=5.131&callback=${callbackName}`;
    script.onerror = () => {
      alert('Failed to load data from VK');
      delete window[callbackName];
      document.body.removeChild(script);
    };
    
    document.body.appendChild(script);
  }

  static processData(result) {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src.includes('api.vk.com/method/photos.get')) {
        document.body.removeChild(script);
      }
    });

    if (result.error) {
      alert(`VK API Error: ${result.error.error_msg}`);
      this.lastCallback = () => {};
      return;
    }

    if (!result.response) {
      alert('No photos found');
      this.lastCallback = () => {};
      return;
    }

    const photos = result.response.items.flatMap(item => {
      return item.sizes
        .map(size => ({
          url: size.url,
          width: size.width,
          height: size.height,
          type: size.type
        }))
        .sort((a, b) => (b.width * b.height) - (a.width * a.height))
        .slice(0, 1);
    });

    this.lastCallback(photos);
    this.lastCallback = () => {};
  }
}