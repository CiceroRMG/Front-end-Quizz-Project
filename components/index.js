import { Header } from "./header/header.js"
import { MainLayout } from "./mainLayout/mainLayout.js"
import { NavBar } from "./nav-bar/nav-bar.js"
import { ListItens } from "./listItens/listItens.js"
import { AppLayout } from "./appLayout/appLayout.js"
import { Toaster } from "./toaster/toaster.js"

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
    backBtn: true,
}

const titles = [
    {
        as: "h1",
        text: "Teste"
    },
    {
        as: "p",
        text: "Teste"
    },
    {
        as: "p",
        text: "Teste"
    }
]

const itens = [
    {
        contents: [
            {
                as: "h1",
                text: "teste",
            },
            {
                as: "p",
                text: "teste",
            },
            {
                as: "span",
                text: "teste",
            }
        ],
        click: true,
        onclick(){
            window.location.href = "https://www.google.com"
        }
    },
    {
        contents: [
            {
                as: "h1",
                text: "teste",
            },
            {
                as: "a",
                text: "teste",
            },
            {
                as: "a",
                text: "teste",
                link: "https://www.google.com"
            }
        ],
        click: true,
        style: "space"
    },
    {
        contents: [
            {
                as: "h1",
                text: "teste",
            },
            {
                as: "button",
                text: "teste",
            }
        ],
        click: true
    }
]

const contentAll = {
    elements: titles,
    itens: itens
}

const toasterContent = {
    title: "Sucesso",
    subtitle: "Tal ação realizada com sucesso.",
    image: "./toaster/img/checkCircle.svg"
}

function page(){
    const div = AppLayout()

    div.append(NavBar(arrayItensOfNav))

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))
    main.append(ListItens(contentAll))

    main.append(Toaster(toasterContent))

    document.body.append(div)
}

page()