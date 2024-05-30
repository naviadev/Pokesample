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
      let fetchJson = await fetch(`http://localhost:3001/login`, {method:"POST", body : JSON.stringify({email : email.value, pw : pw.value})})
    })  
  }
}
