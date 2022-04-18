class BookmarksView {
  #parentElement = document.querySelector('.bookmarks__list');
  #data;
  render(data) {
    this.#data = data;
    this.#clearHtml();
    this.#data.forEach(element => {
      this.#generateHtml(element);
    });
  }
  addHandleEvent(handle) {
    window.addEventListener('load', handle);
  }
  #clearHtml() {
    this.#parentElement.innerHTML = '';
  }
  #generateHtml(element) {
    const html = `<li class="preview">
    <a class="preview__link preview__link--active" href="#${element.id}">
      <figure class="preview__fig">
        <img src="${element.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${element.title}</h4>
        <p class="preview__publisher">${element.publisher}</p>
        
      </div>
    </a>
  </li>`;
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new BookmarksView();
