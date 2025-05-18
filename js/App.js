// App.js
class App {
  static init() {
    this.searchBlock = new SearchBlock(
      document.querySelector('.search-block')
    );

    this.imageViewer = new ImageViewer(
      document.querySelector('.images-wrapper')
    );

    this.initModals();
  }

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

  static getModal(name) {
    return this.modals[name];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});