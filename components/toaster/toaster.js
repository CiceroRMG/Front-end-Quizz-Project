import { Header } from "../header/header.js"


export function Toaster({title, subtitle, image}){

    const toaster = document.createElement('div')
    toaster.classList.add('toaster-container')

    const content = Header({title: title, subtitle: subtitle, image: image})
    toaster.append(content)

    const btn = document.createElement('button')
    const imgBtn = document.createElement('img')

    imgBtn.setAttribute('src', './toaster/img/x.svg')
    btn.append(imgBtn)
    btn.classList.add('x-btn')
    btn.onclick = ()=>{toaster.classList.add("hidden")}

    toaster.append(btn)

    return toaster
}