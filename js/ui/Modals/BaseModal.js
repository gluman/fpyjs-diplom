// BaseModal.js
class BaseModal {
  constructor(element) {
    this.element = element;
  }

  open() {
    this.element.modal('show');
  }

  close() {
    this.element.modal('hide');
  }
}