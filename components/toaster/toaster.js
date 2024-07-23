import { Header } from "../header/header.js"


export function Toaster({title, subtitle, image, style = "success", timeout}){

    const toaster = document.createElement('div')
    toaster.classList.add('toaster-container')

    if(style === "error"){
        toaster.classList.add('error')
    }
    if(style === "info"){
        toaster.classList.add('info')
    }
    const content = Header({title: title, subtitle: subtitle, image: image})
    toaster.append(content)

    const btn = document.createElement('button')
    const imgBtn = document.createElement('img')

    imgBtn.setAttribute('src', '/components/toaster/img/x.svg')
    btn.append(imgBtn)
    btn.classList.add('x-btn')
    btn.onclick = ()=>{toaster.classList.add("hidden")}


    toaster.append(btn)

    toaster.classList.add('animate-in-left')
    setTimeout(()=>{
        setTimeout(()=>{
            toaster.remove()
        }, 1000)
        toaster.classList.add('animate-in-right')
    }, 4000)

    return toaster
}