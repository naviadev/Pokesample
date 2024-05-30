export class ContentView extends HTMLElement {
  constructor() {
    super();

    const shadowDom = this.attachShadow({ mode: 'open' });

    const contentSection = document.createElement('div');
    contentSection.setAttribute('id', 'content-section');

    const popularSampleSection = document.createElement('div');
    popularSampleSection.setAttribute('id', 'popular-sample-section'); 

    const newsSection = document.createElement('div');
    newsSection.setAttribute('id', 'news-section');

    const leftButton = document.createElement('button');
    leftButton.innerHTML = 'left';
    newsSection.appendChild(leftButton);

    const rightButton = document.createElement('button');
    rightButton.innerHTML = 'right';
    newsSection.appendChild(rightButton);

  
    shadowDom.appendChild(contentSection);
    contentSection.appendChild(popularSampleSection);
    contentSection.appendChild(newsSection);
  }
}

customElements.define('content-view', ContentView);
