import { logout } from "../../scripts/pushToLoginPage.js"
import { Dialog } from "../dialog/dialog.js"
import { Logo } from "../logo/logo.js"
import { Header } from "../header/header.js"
import { MainLayout } from "../mainLayout/mainLayout.js"


const liItens = {
    itens: [
        {
            text: "Alunos",
            href: "#"
        },
        {
            text: "Professores",
            href: "#"
        },
        {
            text: "Disciplinas",
            href: "#"
        }
    ]
}

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

export function NavBarItens({img, text, link, as = "a", onclick = null, type = "normal"}){
    // img // text // type -> a or ul
    const div = document.createElement("div")
    div.classList.add('element')
    const element = document.createElement(as)
    element.classList.add('nav-item')
    const conteudo = `<img src="${img}"> ${text}`
    element.innerHTML = conteudo

    if (as === "a"){
        element.setAttribute('href', link)
    }
    if (as === "button"){
        element.onclick = onclick
        if (type === "ul"){
            const arrow = document.createElement('img')
            arrow.setAttribute("src", "./nav-bar/img/arrow.svg")
            arrow.classList.add("arrow-nav")
            element.append(arrow)
            const ul = NavUlItens(liItens)
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
    const logoBar = Logo()
    header.append(logoBar)

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
            type: component.type
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

    header.append(Dialog(logoutDialog))


    return header
}




// function page(){
//     const div = document.createElement('div')
//     div.classList.add('app')
//     div.style.display = "flex"
//     div.style.backgroundColor = "#1E1B4B"

//     div.append(NavBar(arrayItensOfNav))

//     const main = MainLayout()
//     div.append(main)
//     main.append(Header(headerContent))

//     document.body.append(div)
// }

// page()