import { Login } from "../../components/login/login.js"
import { LoginLayout } from "../../components/loginLayout/loginLayout.js"


const loginData = {

    title: "Faça Login",
    inputs: [
        {
            label: "Matrícula ou Email",
            error: "Os dados não correspondem a um usuário",
            id: "login",
            placeholder: "usuario@gmail.com",
        },
        {
            label: "Senha",
            id: "password",
            type: "password"
        }
    ],
    link: {
        href: "#",
        content: "Esqueceu a senha?"
    },
    btn: {
        text: "Entrar",
        type: "primary-l"
    }

}

function page(){

    const layout = LoginLayout()

    const form = document.createElement('form')
    form.classList.add('section-form')
    form.style.width = "100%"

    const login = Login(loginData)
    form.append(login)

    layout.append(form)

    document.body.append(layout)
}

page()