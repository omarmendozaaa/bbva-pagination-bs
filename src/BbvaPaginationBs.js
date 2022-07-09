import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './BbvaPaginationBs-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<bbva-pagination-bs></bbva-pagination-bs>
```

##styling-doc

@customElement bbva-pagination-bs
*/
export class BbvaPaginationBs extends LitElement {
  static get is() {
    return 'bbva-pagination-bs';
  }

  getPagination() {
    if(this.initialPage == 1){
      for (let a = this.initialPage;a <= this.visualPages && a <= this.maxPage;a++) {
        this.renderPage.push(
          html`<li
            class="page-item ${this.selectPage == a ? 'active' : ''}"
            @click=${() => this._clickPage(a)}
          >
            <a class="page-link" href="#">${a}</a>
          </li>`
        )
    }
    }
    else{
      for (let a = this.initialPage;a < this.visualPages + this.initialPage && a <= this.maxPage;a++) {
        this.renderPage.push(
          html`<li
            class="page-item ${this.selectPage == a ? 'active' : ''}"
            @click=${() => this._clickPage(a)}
          >
            <a class="page-link" href="#">${a}</a>
          </li>`
        )
    }
    }
  }

  _clickPage(page) {
    if(page >= 1 && page <= 500){
      this.selectPage = page;
    }
    this.renderPage = [];
    if(this.selectPage > this.visualPages - 2 + this.initialPage) {
      this.initialPage = this.selectPage;
    }
    if(this.selectPage < this.initialPage){
      this.initialPage = this.selectPage;
    }
    this.getPagination();
  }
  // Declare properties
  static get properties() {
    return {
      selectPage: { type: Number },
      maxPage: {type: Number},
      visualPages: {type: Number}
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.maxPage = 500;
    this.selectPage = 1;
    this.initialPage = 1;
    this.visualPages = 7;
    this.renderPage = [];
    this.getPagination();
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('bbva-pagination-bs-shared-styles'),
    ];
  }

  // Define a template
  render() {
    return html`
      <ul class="pagination pagination-lg justify-content-end">
        <li class="page-item">
          <a class="page-link" href="#" @click=${() => this._clickPage(this.selectPage - 1)} tabindex="-1" aria-disabled="true"
            >Previous</a
          >
        </li>
        ${this.renderPage}
        <li class="page-item">
          <a class="page-link" href="#" @click=${() => this._clickPage(this.selectPage + 1)}>Next</a>
        </li>
      </ul>
    `;
  }
}
