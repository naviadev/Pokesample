import { loginFormEventModule } from "./LoginModule/login.js";
import { ContentView } from "./HTML_Component/content-view.js";
import { RegisterView } from "./HTML_Component/register-view.js";
import { registerModule } from './LoginModule/register.js'

loginFormEventModule()

let mainController = () => {

}

window.onload = ()=>{
  customElements.define('content-view', ContentView);
  customElements.define('register-view', RegisterView);

  let content = document.createElement('content-view');
  let mainView = document.getElementById('main-view') as HTMLDivElement;

  mainView.insertBefore(content, mainView.children[0]);
  // mainView.insertBefore(register, mainView.children[0]);

  let aTag = document.getElementById('register');
  aTag?.addEventListener('click', ()=>{
    registerModule(mainView);
  })

  
  let logo = document.getElementById('logo');
  logo?.addEventListener('click', ()=>{
    let mainView = document.getElementById('main-view') as HTMLDivElement;
    mainView.removeChild(mainView.children[0])
    
    let content = document.createElement('content-view');
    
    mainView.insertBefore(content, mainView.children[0]);
  })
}


