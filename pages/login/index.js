import { Login } from "../../components/login/login.js"
import { LoginLayout } from "../../components/loginLayout/loginLayout.js"


const loginData = {

    title: "Faça Login",
    inputs: [
        {
            label: "Matrícula ou Email",
            error: "Os dados não correspondem a um usuário",
            id: "user-login",
            placeholder: "usuario@gmail.com",
        },
        {
            label: "Senha",
            id: "password-login",
            type: "password"
        }
    ],
    link: {
        href: "#",
        content: "Esqueceu a senha?"
    },
    btn: {
        onclick: ()=>{console.log('oi')},
        text: "Entrar",
        type: "primary-l"
    }

}

function page(){

    const layout = LoginLayout()

    const login = Login(loginData)
    layout.append(login)

    document.body.append(layout)
}

page()