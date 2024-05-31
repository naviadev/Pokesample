export let registerView = (parent : HTMLDivElement) => {
  parent.removeChild(parent.children[0])
  let register = document.createElement('register-view');
  parent.insertBefore(register, parent.children[0]);
}