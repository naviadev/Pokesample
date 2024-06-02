export let logoAddEvent = (mainView) => {
    let logo = document.getElementById('logo');
    if (logo !== undefined && logo !== null) {
        logo === null || logo === void 0 ? void 0 : logo.addEventListener('click', () => {
            let mainView = document.getElementById('main-view');
            mainView.removeChild(mainView.children[0]);
            let content = document.createElement('content-view');
            mainView.insertBefore(content, mainView.children[0]);
        });
    }
};
