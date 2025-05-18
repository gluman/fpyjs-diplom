class App {
  /**
   * Инициализирует основные компоненты приложения
   */
  static init() {
    // Инициализация блока поиска
    this.searchBlock = new SearchBlock(
      document.querySelector('.search-block')
    );

    // Инициализация блока просмотра изображений
    this.imageViewer = new ImageViewer(
      document.querySelector('.images-wrapper')
    );

    // Инициализация модальных окон
    this.initModals();
  }

  /**
   * Инициализирует модальные окна с помощью Semantic UI
   */
  static initModals() {
    this.modals = {
      fileUploader: new FileUploaderModal(
        $('.ui.modal.file-uploader-modal').modal({
          closable: false,
          observeChanges: true
        })
      ),
      filePreviewer: new PreviewModal(
        $('.ui.modal.uploaded-previewer-modal').modal({
          closable: false,
          observeChanges: true
        })
      )
    };
  }

  /**
   * Возвращает модальное окно по имени
   */
  static getModal(name) {
    return this.modals[name];
  }
}

// Экспорт для Node.js среды (если нужно)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}