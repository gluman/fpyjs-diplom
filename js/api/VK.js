/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {
  static ACCESS_TOKEN = 'vk1.a.bOwH46M6fs3Amc8XVwK8Uka_RatxumB-_8dSJmjNxD4gzZjW5-PEC26PCnSfSDp4k1fkmIHMEI2C2rvroON4utCPPkbCCfV0o45kfxdzijvFsG_sE59Rr3tcYJIsYtEjR-0cH30pDcDyz5_nv_pnnNcDUs9cMelKmOYOMgdTNr7PidVtIrqkZY3yWVv5ihU5aCK9x5iVAV-KD0GQv3bxGw';
  static lastCallback = () => {};

  /**
   * Получает изображения
   * */
  static get(id = '', callback) {
    this.lastCallback = callback;
    
    const script = document.createElement('script');
    const callbackName = `jsonp_${Date.now()}`;
    
    window[callbackName] = (response) => {
      this.processData(response);
      delete window[callbackName];
    };
    
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=${callbackName}`;
    script.onerror = () => {
      alert('Failed to load data from VK');
      delete window[callbackName];
      document.body.removeChild(script);
    };
    
    document.body.appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    // Remove all script tags we added
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

    // Find largest photos
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