import { logout } from "../../scripts/pushToLoginPage.js"
import { Dialog } from "../dialog/dialog.js"
import { Logo } from "../logo/logo.js"


export function NavUlItens({itens = [{text, href}]}){
    const element = document.createElement("div")
    element.classList.add('ul')
    element.classList.add('hidden')
    
    const ul = document.createElement("ul")
    ul.classList.add("nav-list")
    for(const item of itens){
        const li = document.createElement("li")
        li.setAttribute('href', item.href)
        li.textContent = item.text
        ul.append(li)
    }

    element.append(ul)
    return element
}

export function NavBarItens({img, text, link, as = "a", onclick = null, type = "normal", listItens = null}){
    // img // text // type -> a or ul
    const div = document.createElement("div")
    div.classList.add('element')
    const element = document.createElement(as)
    element.classList.add('nav-item')
    const conteudo = `<img src="${img}"> <p>${text}</p>`
    element.innerHTML = conteudo

    if (as === "a"){
        element.setAttribute('href', link)
    }
    if (as === "button"){
        element.onclick = onclick
        if (type === "ul"){
            const arrow = document.createElement('img')
            arrow.setAttribute("src", "/components/nav-bar/img/arrow.svg")
            arrow.classList.add("arrow-nav")
            element.append(arrow)
            const ul = NavUlItens(listItens)
            div.append(ul)
            element.addEventListener('click', ()=>{
                ul.classList.toggle('hidden')
                ul.classList.toggle('animate-in')
                arrow.classList.toggle('select')
            })
        }
    }

    div.append(element)
    return div
}

export function NavBar({mainComponents = [], footerComponents = []}){
    const header = document.createElement('header')
    header.classList.add('nav-bar-layout')

    // header
    const divLogo = document.createElement('div')
    divLogo.classList.add('logo-div')
    const logoBar = Logo()
    divLogo.append(logoBar)
    header.append(divLogo)

    // nav
    const nav = document.createElement("div")
    nav.classList.add('nav')
    for (const component of mainComponents){
        const item = NavBarItens({
            img: component.img,
            text: component.text,
            as: component.as,
            link: component.link,
            onclick: component.onclick,
            type: component.type,
            listItens: component.listItens
        })
        nav.appendChild(item)
    }
    header.append(nav)

    // footer
    const footer = document.createElement("div")
    footer.classList.add('nav-footer')
    for (const component of footerComponents){
        const item = NavBarItens(component)
        footer.appendChild(item)
    }
    header.append(footer)

    const logoutDialog = {
        title: "Tem certeza que deseja sair?",
        dialogButtons: [
            {
                text: "Cancelar",
                type: "outline-md",
                onclick(){
                    const dialog = document.querySelector('.dialog')
                    dialog.close()
                }
            },
            {
                text: "Sair",
                type: "destructive-md",
                async onclick(){
                    await logout()
                }
            },
        ]
    } 
    header.append(Dialog(logoutDialog))


    return header
}