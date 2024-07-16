import { logout } from "../../scripts/pushToLoginPage.js"
import { Dialog } from "../dialog/dialog.js"
import { Logo } from "../logo/logo.js"




const arrayItensOfNav = {
    mainComponents: [
        {
            img: "./img/house.svg",
            text: "Dashboard",
            as: "a",
            link: "#"
        },
        {
            img: "./img/book.svg",
            text: "Disciplinas",
            as: "button",
            link: "#",
            type: "ul"
        }
    ],
    footerComponents: [
        {
            img: "./img/password.svg",
            text: "Trocar a senha",
            as: "a",
            link: "#"
        }, 
        {
            img: "./img/logout.svg",
            text: "Encerrar sessão",
            as: "button",
            link: "#",
            type: "normal",
            onclick(){
                const dialog = document.querySelector('.dialog')
                dialog.showModal()
                dialog.classList.add('animate-in')
            }
        }
    ],
}

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



function NavUlItens({itens = [{text, href}]}){
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

function NavBarItens({img, text, link, as = "a", onclick = null, type = "normal"}){
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
            arrow.setAttribute("src", "./img/arrow.svg")
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

function NavBar({mainComponents = [], footerComponents = []}){
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




function page(nav){
    document.body.append(nav)
}

page(NavBar(arrayItensOfNav))