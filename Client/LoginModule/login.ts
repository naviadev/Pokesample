export let loginFormEventModule = () => {
  let loginForm = document.getElementById('login-form');
  
  if(!loginForm){
    return
  }else{
    loginForm.addEventListener('submit', async(e) : Promise<void> => {
      e.preventDefault()
      let formTag = e.target as HTMLFormElement;
      let email = formTag[0] as HTMLInputElement;
      let pw = formTag[1] as HTMLInputElement;

      let loginRes = fetch(`http://localhost:3001/login`, {method:"POST", body : JSON.stringify({email : email.value, pw : pw.value})}).then(
        (result)=>{
          // console.log(result)
          // 쓰기 작업, 읽기 작업. 절차가 비어있다. 
          // 쿠키, key value 셋업부터. 
          // front -> 접근자 writealbe? 켜져있는지.
          // document.cookie = 
        }
      )

      
    })  
  }
}
