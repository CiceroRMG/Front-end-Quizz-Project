
const mainNav = {
    mainComponents: [
        navBarItens({
            img: "./img/house.svg",
            text: "Dashboard",
            type: "a",
            link: "#"
        }),
        navBarItens({
            img: "./img/book.svg",
            text: "Disciplinas",
            type: "a",
            link: "#"
        })
    ],
    footerComponents: [
        navBarItens({
            img: "./img/password.svg",
            text: "Trocar a senha",
            type: "a",
            link: "#"
        }), 
        navBarItens({
            img: "./img/logout.svg",
            text: "Encerrar sessão",
            type: "a",
            link: "#"
        })
    ],
}


function navBarItens({img, text, link, type = "a"}){
    // img // text // type -> a or ul
    const div = document.createElement("div")
    div.classList.add('element')

    // div.append(image)

    if (type === "a"){
        const elementLink = document.createElement('a')
        elementLink.setAttribute('href', link)
        const conteudo = `<img src="${img}"> ${text}`
        elementLink.innerHTML = conteudo
        div.append(elementLink)
    }
    if (type === "ul"){
        const elementUl = document.createElement('button')
        elementUl.innerText = text
        const arrow = document.createElement('img')
        arrow.setAttribute("src", "./img/arrow.svg")
        arrow.classList.add("arrow-nav")
        elementUl.append(arrow)
        div.append(elementUl)
    }
    return div
}



function navBar({mainComponents = [], footerComponents = []}){
    const header = document.createElement('header')
    header.classList.add('nav-bar-layout')
    // header
    const logo = document.createElement("div")
    logo.classList.add("logo")
    const logoImg = document.createElement("img")
    logoImg.setAttribute('src', './img/logo.svg')
    logo.appendChild(logoImg)
    header.append(logo)

    // nav
        // vai ser composto de componentes
        // aqui tem que receber uma array, por que dependendo de quantos componentes for usar tem que dar um forEach() pra adicionar na lista
    const nav = document.createElement("div")
    nav.classList.add('nav')
    for (const component of mainComponents){
        nav.appendChild(component)
    }
    header.append(nav)

    // footer
        // vai ser composto de 1 ou 2 componentes (logout(obrigatorio) e trocar a senha)

    const footer = document.createElement("div")
    footer.classList.add('nav-footer')
    for (const component of footerComponents){
        footer.appendChild(component)
    }
    header.append(footer)


    return header
}


function page(nav){
    document.body.append(nav)
}

page(navBar(mainNav))