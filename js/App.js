/**
 * Класс App управляет всем приложением
 */
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
      // Модалка загрузки файлов
      fileUploader: new FileUploaderModal(
        $('.ui.modal.file-uploader-modal').modal({
          closable: false,
          observeChanges: true
        })
      ),

      // Модалка просмотра загруженных файлов
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
   * @param {string} name Имя модального окна
   * @returns {BaseModal} Экземпляр модального окна
   */
  static getModal(name) {
    return this.modals[name];
  }
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});