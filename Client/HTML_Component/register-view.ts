export class RegisterView extends HTMLElement {

  [key: string]: any;
  pwState: boolean;
  checkState: boolean;
  nameState: boolean;
  emailState: boolean;
  emailUrlState: boolean;
  emailString: {
    [key: string]: string
  };

  constructor() {
    super()

    this.pwState = false;
    this.checkState = false;
    this.nameState = false;
    this.emailState = false;
    this.emailUrlState = false;

    this.emailString = {
      id: "",
      url: ""
    };

    this.createDOM()
    this.mainView = document.getElementById('main-view');
  }

  createDOM() {
    const shadowDom = this.attachShadow({ mode: 'open' });
    
    const registerSection = document.createElement('div');
    registerSection.setAttribute('id', 'register-section');

    // header 
    const headerTag = document.createElement('h2');
    headerTag.innerHTML = "회원가입";

    // name
    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'nameInput');
    nameInput.setAttribute('placeholder', 'Insert your name');
    nameInput.setAttribute('type', 'text');

    // email 
    const emailWrapper = document.createElement('div');
    const emailInput = document.createElement('input');
    const at = document.createElement('p');
    const emailURL = document.createElement('input');
    emailWrapper.setAttribute('id', 'email-wrapper');
    at.innerHTML = '@';

    // password
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('id', 'passwordInput');
    passwordInput.setAttribute('placeholder', '대소문자+숫자+특수문자 6 ~ 18');
    passwordInput.setAttribute('type', 'password');

    // pwCheck
    const pwcheckInput = document.createElement('input');
    pwcheckInput.setAttribute('id', 'passwordCheck');
    pwcheckInput.setAttribute('placeholder', '비밀번호 확인');
    pwcheckInput.setAttribute('type', 'password');

    // sendServer 3001 port
    const submitButton = document.createElement('button');
    submitButton.innerText = '가입';

    // append HtmlElemnet
    shadowDom.appendChild(this.setStyle());
    shadowDom.appendChild(registerSection);
    registerSection.appendChild(headerTag);
    registerSection.appendChild(nameInput);
    registerSection.appendChild(emailWrapper);
    emailWrapper.appendChild(emailInput);
    emailWrapper.appendChild(at);
    emailWrapper.appendChild(emailURL);
    registerSection.appendChild(passwordInput);
    registerSection.appendChild(pwcheckInput);
    registerSection.appendChild(submitButton);

    // EventListener 
    this.addInputEventListener(nameInput, this.nameValidation, 'nameState');
    this.addInputEventListener(emailInput, this.emailIdValidation, 'emailState', 'id');
    this.addInputEventListener(emailURL, this.emailUrlValidation, 'emailUrlState', 'url');
    this.addInputEventListener(passwordInput, this.passwordValidation, 'pwState');

    pwcheckInput.addEventListener('input', (e) => {
      const checkTag = e.target as HTMLInputElement;
      this.checkState = passwordInput.value === checkTag.value;
    });

    // send request 3001 port
    submitButton.addEventListener('click', this.submitController.bind(this, nameInput, emailInput, emailURL, passwordInput));
  }

  addInputEventListener(element: HTMLInputElement, validationFn: (value: string) => boolean, stateKey: string, emailKey?: string) {
    element.addEventListener('input', (e) => {
      const inputTag = e.target as HTMLInputElement;
      const isValid = validationFn(inputTag.value);
      this[stateKey] = isValid;
      if(emailKey !== undefined){
        this.emailString[emailKey] = isValid ? inputTag.value : '';
      }
    });
  }

  async submitController(nameInput: HTMLInputElement, emailInput: HTMLInputElement, emailURL: HTMLInputElement, passwordInput: HTMLInputElement) {
    try {
      const emailCheckResponse = await fetch(`http://localhost:3001/emailCheck/${this.emailString.id}@${this.emailString.url}`, { method: 'GET' });
      if (emailCheckResponse.status === 200) {
        alert('중복된 이메일입니다.');
        return;
      }
    } catch (error) {
      alert('Node Server Check 해봐.');
      return;
    }

    if (this.pwState && this.checkState && this.emailState && this.emailUrlState && this.nameState) {
      const payload = {
        name: nameInput.value,
        email: emailInput.value,
        emailURL: emailURL.value,
        pw: passwordInput.value
      };

      try {
        const registerResponse = await fetch('http://localhost:3001/register', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        
        if (registerResponse.ok) {
          alert('가입 성공!');
          this.mainView.removeChild(this.mainView.children[0]);
          let contentView = document.createElement('content-view');
          this.mainView.insertBefore(contentView, this.mainView.children[0])
        } else {
          alert('가입 실패. 다시 시도해주세요.');
        }

      } catch (error) {
        alert('가입 요청 중 오류가 발생했습니다.');
      }
    } else {
      alert('틀린 양식이 있습니다. (switch로 알려주기.)');
    }
  }

  emailIdValidation(name: string): boolean {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(name);
  }

  emailUrlValidation(url: string): boolean {
    const result = /^[a-zA-Z0-9.-]{2,12}$/.test(url) ? url.split('.') : false;
    if (result !== false) {
      if (result.length > 3 || url[url.length - 1] === '.') return false;
      const [str1, str2] = result;
      if (str1.includes('.') || (str2 && str2.includes('.'))) return false;
      return true;
    }
    return false;
  }

  nameValidation(name: string): boolean {
    return /^[a-zA-Zㄱ-힣0-9.]{2,12}$/.test(name);
  }

  passwordValidation(pw: string): boolean {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/.test(pw);
  }

  setStyle() {
    const style = document.createElement('style');
    style.textContent = `
      #register-section{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      #register-section > div, 
      #register-section > input {
        margin: 30px;
      }
      #email-wrapper {
        display: flex;
        height: 20px;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    `;
    return style;
  }
}