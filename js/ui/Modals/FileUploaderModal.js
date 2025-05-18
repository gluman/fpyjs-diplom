// FileUploaderModal.js
class FileUploaderModal extends BaseModal {
  constructor(element) {
    super(element);
    this.content = element.find('.content')[0];
    this.registerEvents();
  }

  registerEvents() {
    this.element.find('.x.icon').on('click', () => this.close());
    this.element.find('.close.button').on('click', () => this.close());
    this.element.find('.send-all.button').on('click', () => this.sendAllImages());
    
    $(this.content).on('click', (e) => {
      const target = $(e.target);
      if (target.hasClass('upload')) {
        const container = target.closest('.image-preview-container');
        this.sendImage(container);
      }
    });
  }

  showImages(images) {
    const html = images.reverse().map(image => this.getImageHTML(image)).join('');
    this.content.innerHTML = html;
  }

  getImageHTML(item) {
    return `
      <div class="image-preview-container">
        <img src='${item.url}' />
        <div class="ui action input">
          <input type="text" placeholder="Имя файла">
          <button class="ui button upload"><i class="upload icon"></i></button>
        </div>
      </div>
    `;
  }

  sendAllImages() {
    const containers = this.content.querySelectorAll('.image-preview-container');
    containers.forEach(container => this.sendImage($(container)));
  }

  sendImage(imageContainer) {
    const input = imageContainer.find('input');
    const button = imageContainer.find('.upload');
    const img = imageContainer.find('img')[0];
    const fileName = input.val().trim();
    
    if (!fileName) {
      input.parent().addClass('error');
      return;
    }

    input.parent().removeClass('error');
    button.addClass('disabled');
    button.find('i').removeClass('upload').addClass('spinner loading');

    Yandex.uploadFile(fileName, img.src, (err, response) => {
      if (!err) {
        imageContainer.remove();
      }
      button.removeClass('disabled');
      button.find('i').removeClass('spinner loading').addClass('upload');
    });
  }
}