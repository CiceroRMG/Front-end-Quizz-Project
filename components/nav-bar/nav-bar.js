
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
            link: "#"
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
            as: "a",
            link: "#"
        }
    ],
}

function logo(){
    const logo = document.createElement("div")
    logo.classList.add("logo")
    const logoImg = document.createElement("img")
    logoImg.setAttribute('src', './img/logo.svg')
    logo.appendChild(logoImg)

    return logo
}

function navBarItens({img, text, link, as = "a", onclick = null}){
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
        const arrow = document.createElement('img')
        arrow.setAttribute("src", "./img/arrow.svg")
        arrow.classList.add("arrow-nav")
        element.append(arrow)
        element.onclick = onclick
    }

    div.append(element)
    return div
}


function navBar({mainComponents = [], footerComponents = []}){
    const header = document.createElement('header')
    header.classList.add('nav-bar-layout')

    // header
    const logoBar = logo()
    header.append(logoBar)

    // nav
    const nav = document.createElement("div")
    nav.classList.add('nav')
    for (const component of mainComponents){
        const item = navBarItens(component)
        nav.appendChild(item)
    }
    header.append(nav)

    // footer
    const footer = document.createElement("div")
    footer.classList.add('nav-footer')
    for (const component of footerComponents){
        const item = navBarItens(component)
        footer.appendChild(item)
    }
    header.append(footer)


    return header
}


function page(nav){
    document.body.append(nav)
}

page(navBar(arrayItensOfNav))