interface containerInterface{
  [key:string] : any | object ;
}

class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  recursionCreateElement(elementObject: containerInterface, current?: HTMLElement) : HTMLElement{
    
    const keys: Array<string> = Object.keys(elementObject);

    for (let i = 0; i < keys.length; i++) {
      let str : string = keys[i];
      let tagType = keys[i].split("-")[1];
      let element = document.createElement(tagType);
      element.setAttribute("id", `${keys[i]}`);

      if (Array.isArray(elementObject[str])){
        return element;
      } else {
        let subKeys = Object.keys(elementObject[str])
        for(let j = 0; j < subKeys.length; j++){
          let getElement = this.recursionCreateElement(elementObject[str], element);
          element.appendChild(getElement);
        }
      }
    }

    return document.createElement('div');
  }
}
