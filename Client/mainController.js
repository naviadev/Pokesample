import { loginFormEventModule } from "./LoginModule/login.js";
import { ContentView } from "./HTML_Component/content-view.js";
import { RegisterView } from "./HTML_Component/register-view.js";
import { registerAddEvent } from './LoginModule/register.js';
import { logoAddEvent } from './Event_Module/logoEvent.js';
window.onload = () => {
    customElements.define('content-view', ContentView);
    customElements.define('register-view', RegisterView);
    let mainView = document.getElementById('main-view');
    let content = document.createElement('content-view');
    mainView.insertBefore(content, mainView.children[0]);
    loginFormEventModule();
    registerAddEvent(mainView);
    logoAddEvent(mainView);
};
let addContentViewElement = () => {
    var _a;
    let cv = document.querySelector('content-view');
    let p = (_a = cv === null || cv === void 0 ? void 0 : cv.shadowRoot) === null || _a === void 0 ? void 0 : _a.children;
};
addContentViewElement();
