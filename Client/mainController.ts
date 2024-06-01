import { loginFormEventModule } from "./LoginModule/login.js";
import { ContentView } from "./HTML_Component/content-view.js";
import { RegisterView } from "./HTML_Component/register-view.js";
import { registerAddEvent } from './LoginModule/register.js'
import { logoAddEvent } from './Event_Module/logoEvent.js'

window.onload = () => {
  
  customElements.define('content-view', ContentView);
  customElements.define('register-view', RegisterView);

  let mainView = document.getElementById('main-view') as HTMLDivElement;
  let content = document.createElement('content-view');
  
  mainView.insertBefore(content, mainView.children[0]);

  
  loginFormEventModule()
  registerAddEvent(mainView);
  logoAddEvent(mainView)  
}

let addContentViewElement = ()=>{
  let cv = document.querySelector('content-view');
  let p = cv?.shadowRoot?.children;
}
addContentViewElement()