export class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  recursionCreateElement(root: any, current: Node = this.shadowRoot!): void {
    // root가 객체인지 확인
    if (root && typeof root === 'object' && !Array.isArray(root)) {
      let keys: string[] = Object.keys(root);

      console.log(`keys : ${keys}`);
      for (let i = 0; i < keys.length; i++) {
        let tagType = keys[i].split('-')[1];

        let newTag: HTMLElement = document.createElement(tagType);

        newTag.setAttribute("id", `${keys[i]}`);

        if (current instanceof Element) {
          current.appendChild(newTag);
        }

        console.log(root[keys[i]]);
        // 재귀 호출
        this.recursionCreateElement(root[keys[i]], newTag);
      }
    }
  }
}

