import { Login } from "../../components/login/login.js"


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
    link: "#",
    btn: {
        onclick: ()=>{console.log('oi')},
        text: "Entrar",
        type: "primary-l"
    }

}

function page(){

    const div = document.createElement('div')

    const login = Login(loginData)
    div.append(login)

    document.body.append(div)
}

page()