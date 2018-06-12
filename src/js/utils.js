var Utils = (function () {
  return {
    getRootElementFromTemplate: function (template) {
      var temp = document.createElement('div');
      temp.innerHTML = template;
      return temp.firstElementChild;
    }
  }
})();