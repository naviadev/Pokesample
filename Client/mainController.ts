import { loginFormEventModule } from "./LoginModule/login.js";
import { ContentView } from "./HTML_Component/content-view.js";
import { RegisterView } from "./HTML_Component/register-view.js";
import { registerView } from './LoginModule/register.js'

loginFormEventModule()

window.onload = () => {
  customElements.define('content-view', ContentView);
  customElements.define('register-view', RegisterView);

  let mainView = document.getElementById('main-view') as HTMLDivElement;
  let content = document.createElement('content-view');
  
  mainView.insertBefore(content, mainView.children[0]);

  registerAddEvent(mainView);
  logoAddEvent(mainView)  
}


let registerAddEvent = (mainView : HTMLDivElement): void =>{
  let aTag = document.getElementById('register') as HTMLButtonElement;
  aTag?.addEventListener('click', () => {
    registerView(mainView);
  })
}

let logoAddEvent = (mainView: HTMLDivElement): void =>{
  let logo = document.getElementById('logo') as HTMLImageElement;
  logo?.addEventListener('click', () => {
    let mainView = document.getElementById('main-view') as HTMLDivElement;
    mainView.removeChild(mainView.children[0]);
    let content = document.createElement('content-view');
    mainView.insertBefore(content, mainView.children[0]);
  })
}