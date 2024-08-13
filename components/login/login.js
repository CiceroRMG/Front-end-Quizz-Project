import { Input } from "../input/input.js"
import { buttom } from "../button/buttom.js"


export function Login({title, inputs = [], link, btn}){

    const loginBox = document.createElement('div')
    loginBox.classList.add('loginBox-div')
    loginBox.classList.add('animate-in-login')

    const head = document.createElement('h1')
    head.classList.add('header-login')
    head.innerText = title
    loginBox.append(head)

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('inputDiv')
    for(const input of inputs){

        const inputElement = Input({
            label: input.label,
            error: input.error,
            id: input.id,
            img: input.img,
            info: input.info,
            placeholder: input.placeholder,
            style: input.style,
            type: input.type
        })

        inputDiv.append(inputElement)
    }
    loginBox.append(inputDiv)


    const linkLogin = document.createElement('a')
    linkLogin.href = link.href
    linkLogin.innerText = link.content
    loginBox.append(linkLogin)

    const submitBtn = buttom({
        img: btn.img,
        onclick: btn.onclick,
        text: btn.text,
        type: btn.type
    })
    submitBtn.setAttribute('type', 'submit')


    loginBox.append(submitBtn)

    return loginBox
}