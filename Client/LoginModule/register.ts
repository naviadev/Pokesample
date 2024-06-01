export let registerAddEvent = (mainView : HTMLDivElement): void =>{
  let aTag = document.getElementById('register') as HTMLButtonElement;
  aTag?.addEventListener('click', () => {
    registerView(mainView);
  })
}

let registerView = (parent : HTMLDivElement) => {
  parent.removeChild(parent.children[0])
  let register = document.createElement('register-view');
  parent.insertBefore(register, parent.children[0]);
}
