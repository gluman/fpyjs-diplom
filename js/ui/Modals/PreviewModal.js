// PreviewModal.js
class PreviewModal extends BaseModal {
  constructor(element) {
    super(element);
    this.content = element.find('.content')[0];
    this.registerEvents();
  }

  registerEvents() {
    this.element.find('.x.icon').on('click', () => this.close());
    
    $(this.content).on('click', (e) => {
      const target = $(e.target);
      if (target.hasClass('delete') || target.closest('.delete').length) {
        const button = target.hasClass('delete') ? target : target.closest('.delete');
        this.handleDelete(button);
      } else if (target.hasClass('download') || target.closest('.download').length) {
        const button = target.hasClass('download') ? target : target.closest('.download');
        this.handleDownload(button);
      }
    });
  }

  handleDelete(button) {
    const path = button.data('path');
    const icon = button.find('i');
    icon.removeClass('trash').addClass('spinner loading');
    button.addClass('disabled');

    Yandex.removeFile(path, (err, response) => {
      if (!err) {
        button.closest('.image-preview-container').remove();
      } else {
        icon.removeClass('spinner loading').addClass('trash');
        button.removeClass('disabled');
      }
    });
  }

  handleDownload(button) {
    const url = button.data('file');
    Yandex.downloadFileByUrl(url);
  }

  showImages(data) {
    const html = data.reverse().map(item => this.getImageInfo(item)).join('');
    this.content.innerHTML = html;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('ru-RU', options);
  }

  getImageInfo(item) {
    const date = this.formatDate(item.created);
    const size = Math.round(item.size / 1024);
    
    return `
      <div class="image-preview-container">
        <img src='${item.file}' />
        <table class="ui celled table">
          <thead>
            <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
          </thead>
          <tbody>
            <tr><td>${item.name}</td><td>${date}</td><td>${size}Кб</td></tr>
          </tbody>
        </table>
        <div class="buttons-wrapper">
          <button class="ui labeled icon red basic button delete" data-path='${item.path}'>
            Удалить
            <i class="trash icon"></i>
          </button>
          <button class="ui labeled icon violet basic button download" data-file='${item.file}'>
            Скачать
            <i class="download icon"></i>
          </button>
        </div>
      </div>
    `;
  }
}