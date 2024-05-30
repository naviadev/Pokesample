export let loginFormEventModule = () => {
  let loginForm = document.getElementById('loginForm');
  if(!loginForm){
    return
  }else{
    loginForm.addEventListener('submit', (e) => {

      e.preventDefault()
  
      console.log(e.target)
  
    })  
  }
}