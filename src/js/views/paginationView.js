class PaginationView {
  #parentElement = document.querySelector('.pagination');
  #data;
  AddEventHandler(handle) {
    this.#parentElement.addEventListener('click', e => {
      if (!e.target.closest('.btn--inline')) return;
      if (e.target.parentElement.hasAttribute('data-id')) {
        let goPage = +e.target.parentElement.getAttribute('data-id');
        handle(goPage);
      } else {
        let goPage = +e.target.getAttribute('data-id');
        handle(goPage);
      }
    });
  }

  render(data) {
    this.#data = data;
    this.#RenderPagination();
  }
  #RenderPagination() {
    this.#parentElement.innerHTML = '';
    const currentPage = this.#data.page;
    const lastPage = Math.ceil(this.#data.results.length / this.#data.PerPage);
    const btnNext = `
          <button class="btn--inline pagination__btn--next" data-id=${
            currentPage + 1
          }>
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
    const btnPrev = `
          <button class="btn--inline pagination__btn--prev" data-id=${
            currentPage - 1
          }>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
    if (currentPage > 1) {
      this.#parentElement.insertAdjacentHTML('afterbegin', btnPrev);
    }
    if (currentPage < lastPage) {
      this.#parentElement.insertAdjacentHTML('afterbegin', btnNext);
    }
  }
}

export default new PaginationView();
