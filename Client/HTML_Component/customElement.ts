interface containerInterface {
  [key: string]: any | object;
}

export class CustomElement extends HTMLElement {

  element: HTMLDivElement;
  constructor() {
    super();
    this.element = document.getElementById('main') as HTMLDivElement;
  }
  recursionCreateElement(root: { [key: string]: any }, current?: HTMLDivElement | any) {
    let keys = Object.keys(root);

    for (let i = 0; i < keys.length; i++) {
      if (Array.isArray(root)) {
        for (let j = 0; j <= root.length / 2; j += 2) {
          for (let k = 0; k < root[j + 1]; k++) {
            let tag = document.createElement(root[j]);
            current.appendChild(tag);
          }
        }
        return
      }

      else {
        let tagType = keys[i].split('-')[1];
        let newTag = document.createElement(tagType);
        newTag.setAttribute("id", `${keys[i]}`);
        current.appendChild(newTag);
        this.recursionCreateElement(root[keys[i]], newTag);

        if (keys.length === 1) {
          const shadowDom = this.attachShadow({ mode: 'open' });
          shadowDom.appendChild(newTag);
        }
      }
    }
  }
}
