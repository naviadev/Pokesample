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

    shadowDom.appendChild(this.setStyleContentView());
    shadowDom.appendChild(contentSection);
    contentSection.appendChild(popularSampleSection);
    contentSection.appendChild(newsSection);
  }

  setStyleContentView() {
    let style = document.createElement('style');
    style.textContent = `
      #content-section {
        display: grid;
        grid-template-rows: 2fr 3fr;
        grid-template-areas:
          "popular"
          "news";
        gap: 30px;
      }
      
      #popular-sample-section {
        grid-area: popular;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      
      #popular-sample-section > div {
        width: 200px;
        height: 80%;
        background-color: rgb(180, 180, 180);
      }

      #news-section {
        grid-area: news;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #news-section button {
        width: 100px;
        height: 40px;
      }
    `;
    return style;
  }
}
