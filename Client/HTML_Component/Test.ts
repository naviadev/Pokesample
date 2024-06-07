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

  recursionCreateElement(): void {
    super.recursionCreateElement(DomElementContainer);
  }

  addEvent() {
    
    const nameTag: HTMLInputElement = document.getElementById('name-input') as HTMLInputElement;

    const emailInput: HTMLInputElement = document.getElementById('email-input') as HTMLInputElement;
    const url : HTMLInputElement = document.getElementById('url-input') as HTMLInputElement;

    const pwCheck: HTMLInputElement = document.getElementById('password-input') as HTMLInputElement;
    const password: HTMLInputElement = document.getElementById('pwcheck-input') as HTMLInputElement;

    const submitButton: HTMLButtonElement = document.getElementById("submit-button") as HTMLButtonElement;

    pwCheck.addEventListener("input", (e) => {
      const checkTag = e.target as HTMLInputElement;
      this.checkState = password.value === checkTag.value;
    });

    submitButton.addEventListener("click", this.submitController.bind(this, nameTag, emailInput, url, password));
  }


  addInputEventListener(element: HTMLInputElement, validationFn: (value: string) => boolean, stateKey: string, emailKey?: string) {
    element.addEventListener("input", (e) => {
      const inputTag = e.target as HTMLInputElement;
      const isValid = validationFn(inputTag.value);
      this[stateKey] = isValid;
      if (emailKey !== undefined) {
        this.emailString[emailKey] = isValid ? inputTag.value : "";
      }
    });
  }

  emailIdValidation(name: string): boolean {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(name);
  }


  emailUrlValidation(url: string): boolean {
    const result = /^[a-zA-Z0-9.-]{2,12}$/.test(url) ? url.split(".") : false;
    if (result !== false) {
      if (result.length > 3 || url[url.length - 1] === ".") return false;
      const [str1, str2] = result;
      if (str1.includes(".") || (str2 && str2.includes("."))) return false;
      return true;
    }
    return false;
  }

  nameValidation(name: string): boolean {
    return /^[a-zA-Zㄱ-힣0-9.]{2,12}$/.test(name);
  }

  passwordValidation(pw: string): boolean {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/.test(
      pw
    );
  }

  async submitController(
    nameInput: HTMLInputElement, emailInput: HTMLInputElement, emailURL: HTMLInputElement, passwordInput: HTMLInputElement
  ) {
    try {
      const emailCheckResponse = await fetch(
        `http://localhost:3001/emailCheck/${this.emailString.id}@${this.emailString.url}`,
        { method: "GET" }
      );
      if (emailCheckResponse.status === 200) {
        alert("중복된 이메일입니다.");
        return;
      }
    } catch (error) {
      alert("Node Server Check 해봐.");
      return;
    }

    if (
      this.pwState &&
      this.checkState &&
      this.emailState &&
      this.emailUrlState &&
      this.nameState
    ) {
      const payload = {
        name: nameInput.value,
        email: emailInput.value,
        emailURL: emailURL.value,
        pw: passwordInput.value,
      };

      try {
        const registerResponse = await fetch("http://localhost:3001/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (registerResponse.ok) {
          alert("가입 성공!");
          this.mainView.removeChild(this.mainView.children[0]);
          let contentView = document.createElement("content-view");
          this.mainView.insertBefore(contentView, this.mainView.children[0]);
        } else {
          alert("가입 실패. 다시 시도해주세요.");
        }
      } catch (error) {
        alert("가입 요청 중 오류가 발생했습니다.");
      }
    } else {
      alert("틀린 양식이 있습니다. (switch로 알려주기.)");
    }
  }


}
