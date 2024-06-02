const passwordRange_min = 8;
const passwordRange_max = 20;
const phoneNumberRange = 11;



function addInputEvent() {

  let container = {
    name: document.getElementById("name"),
    password: document.getElementById("password"),
    checkPassword: document.getElementById("checkPassword"),
    email: document.getElementById("email"),
    phoneNumber: document.getElementById("phoneNumber"),
  }

  let checkBox = document.getElementsByClassName("checkBox")
  let button = document.getElementById("Button");

  let keys = Object.keys(container)


  for (let i = 0; i < keys.length; i++) {

    container[keys[i]].addEventListener('input', (e) => {
      if (funContainer[i] !== undefined) {
        funContainer[i](e.target, checkBox[i])
      }
      else {
        return
      }
    })
  }

  button.addEventListener('click', () => {
    sendServer(container, checkBox)

  })
}

const funContainer = [nameCheck, passwordCheck, matchPassword, checkEmail, checkPhoneNumber]

async function nameCheck(target, checkBox) {


  let promise = await fetch(`check/${target.id}/${target.value}`, { method: "GET" })

  // -> fetch -> 절차를 어기고서 보내겠다. 

  // -> chunk ->  스롯틀링 
  // -> 이벤트 묵인. 
  // -> 1초당 n번의 이벤트 -> -> input tag value
  // -> settimeout()
  // 메서드를 만든다는 느낌. 
  // dispatch event -> 핵심 
  // (커스텀 이벤트) 
  // addevent -> 사용자가 무조건 행동. 데이터의 행동을 감지하는 것은 어렵다. 
  // dispatch 사용해보기. 
  // 

  if (promise.status == 200) {
    checkBox.style.background = "green"
  } else if (promise.status == 404) {
    checkBox.style.background = "red"
  }
}



async function passwordCheck(target, checkBox) {
  let value = target.value



  if (passwordRange_min <= value.length && value.length <= passwordRange_max) {
    checkBox.style.background = "green"
  } else {
    checkBox.style.background = "red"
  }
}

async function matchPassword(target, checkBox) {
  let value = target.value;

  let password = document.getElementById('password');
  if (value === password.value) {
    checkBox.style.background = "green"
  } else {
    checkBox.style.background = "red"
  }
}




const charContainer = {
  // ! Block -> 금지 
  // ! allow -> 하나만 허용한다.
  email: {
    block: ["!", "#", "$", "%", "^", "&", "*", "(", ")", "{", "}", "_", "-", "+", "=", '"', "'", "<", ",", ">", "/", "?", "`", "~", "₩"],
    allow: ["@", "."]
  },

  password: {
    block: ["^", "*", "(", ")", "{", "}", "_", "-", "+", "=", '"', "'", "<", ",", ">", "/", "?", "`", "₩", "."],
  }
  // ! @ & ? # $ % * ~ 허용
}



function checkEmail(target, checkBox) {
  let value = target.value
  console.log(charContainer.email.block.length)
  for (let i = 0; i < charContainer.email.block.length; i++) {
    if (!value.includes(charContainer.email.block[i])) {

      let bool = value.includes(charContainer.email.allow[0]) &&
        value.includes(charContainer.email.allow[1])


      bool ?
        checkBox.style.background = "green" :
        checkBox.style.background = "red"

    }
    else {
      checkBox.style.background = "red"
      break;
    }
  }
}

function checkPhoneNumber(target, checkBox) {
  // 지금은 상관 없지만 만약 더 큰 숫자를 받게된다면 html input tag의 type을 number가 아닌 text로 바꿔야할 필요가 있다. -> Overflow 발생

  let value = target.value;


  if (value.length == phoneNumberRange) {

    let sliceNumber = value.slice(0, 3)

    sliceNumber == "010" ?
      checkBox.style.background = "green" :
      checkBox.style.background = "red"

  }
  else {
    checkBox.style.background = "red"
  }
}

async function sendServer(container, checkBox) {
  let boxChecker = null
  let sendObj = {}

  for (let i = 0; i < checkBox.length; i++) {
    if (checkBox[i].style.background == "green") {
      boxChecker = true
    } else {
      return false
    }
  }

  let keys = Object.keys(container)

  for (let ele of keys) {
    console.log(container[ele].value)
    sendObj[ele] = container[ele].value
  }

  let i = await fetch(`sendUser/${sendObj.name}`,
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendObj)
    })

  const content = await i.json()
  console.log(content)
}



window.onload = addInputEvent()




export class CreateArea {

  constructor(number) {
    this.currentId = {}
    this.root = document.getElementById("stat")
    this.matchNum = number
  }
  CreateLogArea(Root, current = this.root) {
    let keys = Object.keys(Root)
    for (let i = 0; i < keys.length; i++) {
      if (Array.isArray(Root)) {
        this.currentId[current.id] = current
        for (let j = 0; j <= Root.length / 2; j += 2) {
          for (let k = 0; k < Root[j + 1]; k++) {
            let tag = document.createElement(Root[j]);
            current.appendChild(tag)
          }
        }
        return
      }
      else {
        let newTag = document.createElement("div")
        newTag.setAttribute("class", `${keys[i]}`+" "+`${this.matchNum}`)
        current.appendChild(newTag)
        this.CreateLogArea(Root[keys[i]], newTag)
      }
    }
  }
  getCurrentId() {
    return this.currentId
  }

  testCreateButton(){
    
  }
}


