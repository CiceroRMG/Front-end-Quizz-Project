import { Header } from "./header/header.js"
import { MainLayout } from "./mainLayout/mainLayout.js"
import { NavBar } from "./nav-bar/nav-bar.js"


const arrayItensOfNav = {
    mainComponents: [
        {
            img: "./nav-bar/img/house.svg",
            text: "Dashboard",
            as: "a",
            link: "#"
        },
        {
            img: "./nav-bar/img/book.svg",
            text: "Disciplinas",
            as: "button",
            link: "#",
            type: "ul",
            listItens: {
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
        }
    ],
    footerComponents: [
        {
            img: "./nav-bar/img/password.svg",
            text: "Trocar a senha",
            as: "a",
            link: "#"
        }, 
        {
            img: "./nav-bar/img/logout.svg",
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

const headerContent = {
    title: "Dashboard",
    subtitle: "Bem vindo, Aluno",
}

function page(){
    const div = document.createElement('div')
    div.classList.add('app')
    div.style.display = "flex"
    div.style.backgroundColor = "#1E1B4B"

    div.append(NavBar(arrayItensOfNav))

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))

    document.body.append(div)
}

page()