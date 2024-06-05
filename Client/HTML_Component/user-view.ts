export class UserView extends HTMLElement {
  constructor() {
    super();
    // this.createDom();
  }

  createDom(): void {
    let loginSection = document.getElementById('login-section');

    const shadowDom = this.attachShadow({ mode: 'open' });

    const UserDiv = document.createElement('div');
    const nameTag = document.createElement('a');
    const logoutButton = document.createElement('button');

    let child = loginSection?.children;

    if (child) {
      for (let i = 0; i < child?.length; i++) {
        document.removeChild(child[i]);
      }
    }

  }

}
