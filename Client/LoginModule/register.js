export let registerAddEvent = (mainView) => {
    let aTag = document.getElementById('register');
    aTag === null || aTag === void 0 ? void 0 : aTag.addEventListener('click', () => {
        registerView(mainView);
    });
};
let registerView = (parent) => {
    parent.removeChild(parent.children[0]);
    let register = document.createElement('register-view');
    parent.insertBefore(register, parent.children[0]);
};
