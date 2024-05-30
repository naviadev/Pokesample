import { loginFormEventModule } from "./LoginModule/login.js";
import { ContentView } from "./HTML_Component/content-view.js";
loginFormEventModule();
let mainController = () => {
};
window.onload = () => {
    customElements.define('content-view', ContentView);
    let content = document.createElement('content-view');
    let mainView = document.getElementById('main-view');
    mainView.insertBefore(content, mainView.children[0]);
};
