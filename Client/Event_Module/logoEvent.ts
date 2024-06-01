export let logoAddEvent = (mainView: HTMLDivElement): void => {

  let logo = document.getElementById('logo') as HTMLImageElement;

  if (logo !== undefined && logo !== null) {

    logo?.addEventListener('click', () => {

      let mainView = document.getElementById('main-view') as HTMLDivElement;
      mainView.removeChild(mainView.children[0]);
      let content = document.createElement('content-view');
      mainView.insertBefore(content, mainView.children[0]);

    })
  }
}