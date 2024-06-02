var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export let loginFormEventModule = () => {
    let loginForm = document.getElementById('login-form');
    if (!loginForm) {
        return;
    }
    else {
        loginForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            let formTag = e.target;
            let email = formTag[0];
            let pw = formTag[1];
            let loginRes = fetch(`http://localhost:3001/login`, {
                method: "POST",
                // headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({ email: email.value, pw: pw.value }),
                credentials: 'include',
            })
                .then((result) => {
                alert(`성공 : ${result}`);
                // Login이 성공적으로 진행된다면 alter + 세션 권한 부여, login-section을 해당 유저의 정보 창으로 변경.
                // shadow DOM?
            });
        }));
    }
};
