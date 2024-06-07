import { CustomElement } from './customElement.js'
import { DomElementContainer } from './ElementContainer/registerElement.js'

class register extends CustomElement {
  [key: string]: any;
  pwState: boolean;
  checkState: boolean;
  nameState: boolean;
  emailState: boolean;
  emailUrlState: boolean;
  emailString: {
    [key: string]: string;
  };

  constructor() {
    super();
    this.mainView = document.getElementById("main-view");
    this.pwState = false;
    this.checkState = false;
    this.nameState = false;
    this.emailState = false;
    this.emailUrlState = false;
    this.emailString = {
      id: "",
      url: "",
    };
  }

  recursionCreateElement() : void {
    super.recursionCreateElement(DomElementContainer);
  }

  addEvent() {
    
  }

  addInputEventListener(
    element: HTMLInputElement,
    validationFn: (value: string) => boolean,
    stateKey: string,
    emailKey?: string
  ) {
    element.addEventListener("input", (e) => {
      const inputTag = e.target as HTMLInputElement;
      const isValid = validationFn(inputTag.value);
      this[stateKey] = isValid;
      if (emailKey !== undefined) {
        this.emailString[emailKey] = isValid ? inputTag.value : "";
      }
    });
  }


}
