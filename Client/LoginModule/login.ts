export let loginFormEventModule = () => {
  let loginForm = document.getElementById('login-form');

  if(!loginForm){
    return
  }else{
    loginForm.addEventListener('submit', async(e) : Promise<void> => {
      e.preventDefault()
      let i = await fetch(`http://localhost:3001/test`, {method:"GET"})
    })  
  }
}
