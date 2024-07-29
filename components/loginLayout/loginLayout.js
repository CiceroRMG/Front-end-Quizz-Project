import { Logo } from "../logo/logo.js"


export function LoginLayout(){

    const div = document.createElement('div')
    div.classList.add('loginLayout')

    const logoDiv = document.createElement('div')
    logoDiv.classList.add('logo-div-login')

    const logo = Logo({color: "black"})

    logoDiv.append(logo)
    div.append(logoDiv)

    return div
}