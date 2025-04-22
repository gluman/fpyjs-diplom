class ImageViewer {
  constructor(element) {
    this.element = element;
    this.preview = element.querySelector('.ui.fluid.image');
    this.imagesContainer = element.querySelector('.images-list .row:first-of-type');
    this.registerEvents();
  }

  registerEvents() {
    // Double click to preview
    this.imagesContainer.addEventListener('dblclick', (e) => {
      if (e.target.tagName === 'IMG') {
        this.preview.src = e.target.src;
      }
    });

    // Single click to select
    this.imagesContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.classList.toggle('selected');
        this.checkButtonText();
      }
    });

    // Select all button
    const selectAllBtn = this.element.querySelector('.select-all');
    selectAllBtn.addEventListener('click', () => {
      const images = this.imagesContainer.querySelectorAll('img');
      const hasSelected = Array.from(images).some(img => img.classList.contains('selected'));
      
      images.forEach(img => {
        if (hasSelected) {
          img.classList.remove('selected');
        } else {
          img.classList.add('selected');
        }
      });
      
      this.checkButtonText();
    });

    // Show uploaded files button
    const showUploadedBtn = this.element.querySelector('.show-uploaded-files');
    showUploadedBtn.addEventListener('click', () => {
      const modal = App.getModal('filePreviewer');
      modal.content.innerHTML = '<i class="asterisk loading icon massive"></i>';
      modal.open();
      
      Yandex.getUploadedFiles((err, data) => {
        if (!err) {
          modal.showImages(data);
        }
      });
    });

    // Send to disk button
    const sendBtn = this.element.querySelector('.send');
    sendBtn.addEventListener('click', () => {
      const selectedImages = this.imagesContainer.querySelectorAll('img.selected');
      if (selectedImages.length === 0) return;
      
      const modal = App.getModal('fileUploader');
      const images = Array.from(selectedImages).map(img => ({ url: img.src }));
      modal.open();
      modal.showImages(images);
    });
  }

  clear() {
    this.imagesContainer.innerHTML = '';
    this.checkButtonText();
  }

  drawImages(images) {
    const selectAllBtn = this.element.querySelector('.select-all');
    if (images.length > 0) {
      selectAllBtn.classList.remove('disabled');
    } else {
      selectAllBtn.classList.add('disabled');
    }

    const html = images.map(image => `
      <div class='four wide column ui medium image-wrapper'>
        <img src='${image.url}' />
      </div>
    `).join('');

    this.imagesContainer.insertAdjacentHTML('beforeend', html);
    this.checkButtonText();
  }

  checkButtonText() {
    const images = this.imagesContainer.querySelectorAll('img');
    const selectAllBtn = this.element.querySelector('.select-all');
    const sendBtn = this.element.querySelector('.send');
    
    const allSelected = images.length > 0 && Array.from(images).every(img => img.classList.contains('selected'));
    selectAllBtn.textContent = allSelected ? 'Снять выделение' : 'Выбрать всё';
    
    const hasSelected = Array.from(images).some(img => img.classList.contains('selected'));
    if (hasSelected) {
      sendBtn.classList.remove('disabled');
    } else {
      sendBtn.classList.add('disabled');
    }
  }
}