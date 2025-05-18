// SearchBlock.js
class SearchBlock {
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const replaceBtn = this.element.querySelector('.replace');
    const addBtn = this.element.querySelector('.add');
    const input = this.element.querySelector('input');

    replaceBtn.addEventListener('click', () => {
      const id = input.value.trim();
      if (id) {
        VK.get(id, (images) => {
          App.imageViewer.clear();
          App.imageViewer.drawImages(images);
        });
      }
    });

    addBtn.addEventListener('click', () => {
      const id = input.value.trim();
      if (id) {
        VK.get(id, (images) => {
          App.imageViewer.drawImages(images);
        });
      }
    });
  }
}