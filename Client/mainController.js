import { loginFormEventModule } from "./LoginModule/login.js";
import { ContentView } from "./HTML_Component/content-view.js";
import { RegisterView } from "./HTML_Component/register-view.js";
loginFormEventModule();
let mainController = () => {
};
window.onload = () => {
    customElements.define('content-view', ContentView);
    customElements.define('register-view', RegisterView);
    let register = document.createElement('register-view');
    // let content = document.createElement('content-view');
    let mainView = document.getElementById('main-view');
    // mainView.insertBefore(content, mainView.children[0]);
    mainView.insertBefore(register, mainView.children[0]);
};
