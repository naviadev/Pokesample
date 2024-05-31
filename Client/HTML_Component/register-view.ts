export class RegisterView extends HTMLElement {

  
  pwState: boolean;
  checkState: boolean;
  nameState: boolean;
  emailState: boolean;
  emailUrlState: boolean;
  emailString : {
    [key : string] : string
  };

  
  constructor() {
    super()
    this.createDOM()
    this.pwState = false;
    this.checkState = false;
    this.nameState = false;
    this.emailState = false;
    this.emailUrlState = false;
    this.emailString = {
      id : "",
      url : ""
    };
  }

  createDOM() {
    const shadowDom = this.attachShadow({ mode: 'open' })
    const registerSection = document.createElement('div');
    registerSection.setAttribute('id', 'register-section');

    // header 
    const headerTag = document.createElement('h2');
    headerTag.innerHTML = "회원가입"

    // name
    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'nameInput');
    nameInput.setAttribute('placeholder', 'Insert your name');
    nameInput.setAttribute('type', 'text');

    // email 
    const emailWrapper = document.createElement('div');
    const eamilInput = document.createElement('input');
    const at = document.createElement('p')
    const emailURL = document.createElement('input');
    emailWrapper.setAttribute('id', 'email-wrapper');
    at.innerHTML = '@'
    eamilInput.addEventListener('change', () => { });
    emailURL.addEventListener('change', () => { }); ``


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
    submitButton.innerText = '가입'


    // append component
    shadowDom.appendChild(this.setStyle());
    shadowDom.appendChild(registerSection);
    registerSection.appendChild(headerTag);
    registerSection.appendChild(nameInput);
    registerSection.appendChild(emailWrapper);
    emailWrapper.appendChild(eamilInput);
    emailWrapper.appendChild(at)
    emailWrapper.appendChild(emailURL);
    registerSection.appendChild(passwordInput);
    registerSection.appendChild(pwcheckInput);
    registerSection.appendChild(submitButton);



    // email vaildation
    eamilInput.addEventListener('input', (e) => {

      let inputTag = e.target as HTMLInputElement;

      let boolean = this.emailIdValidation(inputTag.value);

      if(boolean){
        this.emailState = true; 
        this.emailString.id = inputTag.value;
      }else{
        this.emailState = false;  
      }
    })

    // url vaildation
    emailURL.addEventListener('input', (e) => {
      let inputTag = e.target as HTMLInputElement;
      let boolean = this.emailUrlValidation(inputTag.value);
      if(boolean){
        this.emailUrlState = true; 
        this.emailString.url = inputTag.value;
      }else{
        this.emailUrlState = false;  
      }
    })

    // pw check
    passwordInput.addEventListener('input', (e) => {
      let pwTag = e.target as HTMLInputElement
      let boolean = this.passwordVaildation(pwTag.value);
      boolean ?
        this.pwState = true :
        this.pwState = false;
    })

    // matching
    pwcheckInput.addEventListener('input', (e) => {
      let checkTag = e.target as HTMLInputElement;

      passwordInput.value === checkTag.value ?
        this.checkState = true :
        this.checkState = false;
    })

    nameInput.addEventListener('input', (e) => {
      let nameTag = e.target as HTMLInputElement;

      let boolean = this.nameValidation(nameTag.value);

      boolean ?
        this.nameState = true :
        this.nameState = false;
    })


    // send request 3001 port
    submitButton.addEventListener('click', async() => {
      //email 중복 체크.



      let emailCheck = await fetch(`http://localhost:3001/emailCheck/${this.emailString.id}@${this.emailString.url}`, {method : 'GET'});
      
      console.log(emailCheck)

      if(emailCheck.status == 200){
        console.log('OO')
      }else if(emailCheck.status == 400){
        console.log('xx')
        return;
      }


      if (this.pwState && this.checkState && this.emailState && this.emailUrlState && this.nameState) {
        let obj = {
          name: nameInput.value,
          email: eamilInput.value,
          emailURL: emailURL.value,
          pw: passwordInput.value
        }
        let registerFetch = fetch('http://localhost:3001/register',
          {
            method: 'POST',
            body: JSON.stringify(obj)
          })
      }
      else{
        alert('안 돼')
      }
    });
  }




  setStyle() {
    let style = document.createElement('style');
    style.textContent = `
    #register-section{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      >div{
        margin: 30px
      }
      >input{
        margin: 30px
      }
      >:nth-child(3){
        display: flex;
        height: 20px;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    }
    `
    return style;
  }



  // 이메일 아이디 확인
  emailIdValidation(name: string): boolean {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(name);
  }

  // 주소 확인
  emailUrlValidation(url: string): boolean {
    let result: any;

    /^[a-zA-Z0-9-..]{2,12}$/.test(url) ?
      result = url.split('.') :
      result = false;

    if (result !== false) {

      if (result.length > 3 || url[url.length - 1] === '.') {
        return false;
      }

      let str1 = result[0] as string;
      let str2 = result[1] as string;

      str1.includes('.') ?
        result = false :
        str2.includes('.') ?
          result = false :
          result = true;
    }

    return result;
  }

  // 닉네임 확인
  nameValidation(name: string): boolean {
    // 한,영 숫자 2~12글자.
    return /^[a-zA-Zㄱ-힣0-9.]{2,12}$/.test(name);
  }


  passwordVaildation(pw: string): boolean {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/.test(pw)
  }
}