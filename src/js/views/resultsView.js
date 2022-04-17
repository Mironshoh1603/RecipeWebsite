import icon from '../../img/icons.svg';

class resultsView {
  #parentElement = document.querySelector('.results');
  #data;
  render(data) {
    this.#data = data;
    this.#clearHtml();
    this.#renderHtml();
  }

  #renderHtml() {
    const recipe = this.#data;
    recipe.forEach(element => {
      const html = `<li class="preview">
    <a class="preview__link preview__link--active" href="#${element.id}">
      <figure class="preview__fig">
        <img src="${element.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${element.title}</h4>
        <p class="preview__publisher">${element.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icon}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
      this.#parentElement.insertAdjacentHTML('beforeend', html);
    });
  }
  #clearHtml() {
    this.#parentElement.innerHTML = '';
  }
}

export default new resultsView();
