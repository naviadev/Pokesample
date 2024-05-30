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

  setStyleContentView(){
    let style = document.createElement('style');
    style.textContent = `
    #content-section{
      display: grid;
      grid-template-rows: 2fr 3fr;
      grid-template-areas:
        "popular"
        "news";
      gap: 30px;
    
      // popular-sample-section
      >:nth-child(1) {
        grid-area: popular;
        border: solid 1px;
        border-radius: 40px;
        @include flexAlign;
        gap: 30px;
    
        >div {
          border-radius: 40px;
          width: 200px;
          height: 80%;
          background-color: rgb(180, 180, 180);
        }
    }
    
    }
    `
    return style;
  }
}




