var App = {
  Views: {},
  Utils: window.Utils
};

(function (module, Utils) {
  var ModalView = module.ModalView = function (options) {
    options = options || {};
    this.rootElement = Utils.getRootElementFromTemplate(options.template);
    this.modalClose = null;
    this.modalContent = null;
    this.modalHeader = null;
    this.template = options.template || '';
    this.title = options.title || '';
    this.content = options.content || '';
    this.handleModalClose = this.handleModalClose.bind(this);
  };
  
  ModalView.prototype.collectChildNode = function () {
    this.modalClose = this.rootElement.querySelector('.Modal-close');
    this.modalContent = this.rootElement.querySelector('.Modal-content');
    this.modalHeader = this.rootElement.querySelector('.Modal-header');
    return this;
  };
  
  ModalView.prototype.classNames = {
    active: 'isActive'
  };
  
  ModalView.prototype.show = function () {
    this.rootElement.classList.add(this.classNames.active);
    return this;
  };
  
  ModalView.prototype.hide = function () {
    this.rootElement.classList.remove(this.classNames.active);
    return this;
  };
  
  ModalView.prototype.canHide = function (event) {
    return this.modalClose.contains(event.target) ||
      event.target.contains(this.rootElement) ||
      event.key === 'Escape' ||
      event.target.hasAttribute('data-modal-hide');
  };
  
  ModalView.prototype.handleModalClose = function () {
    if (this.canHide(event)) {
      this.hide();
    }
    return this;
  };
  
  ModalView.prototype.delegateEvents = function () {
    this.rootElement.addEventListener('click', this.handleModalClose);
    document.addEventListener('keydown', this.handleModalClose);
    return this;
  };
  
  ModalView.prototype.updateContent = function () {
    this.modalContent.innerHTML = this.content;
    this.modalHeader.innerHTML = this.title;
    return this;
  };
  
  ModalView.prototype.appendTo = function (container) {
    container.appendChild(this.rootElement);
    return this;
  };
  
  ModalView.prototype.render = function () {
    return this.collectChildNode().updateContent().delegateEvents();
  };
})(App.Views, window.Utils);
