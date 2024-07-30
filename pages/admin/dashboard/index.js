import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { NavBar } from "../../../components/nav-bar/nav-bar.js"
import { based_url } from "../../../scripts/config.js"


const arrayItensOfNav = {
    mainComponents: [
        {
            img: "/components/nav-bar/img/house.svg",
            text: "Dashboard",
            as: "a",
            link: "/pages/admin/dashboard/dashboard.html",
        },
        {
            img: "/components/nav-bar/img/book.svg",
            text: "Painel",
            as: "button",
            link: "#",
            type: "ul",
            listItens: {
                itens: [
                    {
                        text: "Alunos",
                        href: `${based_url}/pages/admin/painel/painel.html?panel=students`
                    },
                    {
                        text: "Professores",
                        href: `${based_url}/pages/admin/painel/painel.html?panel=professors`
                    },
                    {
                        text: "Disciplinas",
                        href: `${based_url}/pages/admin/painel/painel.html?panel=subjects`
                    }
                ]
            }
        },
    ],
    footerComponents: [
        {
            img: "/components/nav-bar/img/password.svg",
            text: "Trocar a senha",
            as: "a",
            link: "#"
        }, 
        {
            img: "/components/nav-bar/img/logout.svg",
            text: "Encerrar sessão",
            as: "button",
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
    subtitle: "Bem vindo, Admin"
}

const titles = [
    {
        as: "h1",
        text: "Disciplinas"
    },
]

const itens = [
    {
        contents: [
            {
                as: "h1",
                text: "Alunos",
            },
            {
                as: "a",
                text: "Cadastrar novo",
                link: `${based_url}/pages/admin/painel/painel.html?panel=students`
            }
        ],
        click: true,
        onclick: ()=> window.location.href = `${based_url}/pages/admin/painel/painel.html?panel=students`
    },
    {
        contents: [
            {
                as: "h1",
                text: "Professores",
            },
            {
                as: "a",
                text: "Cadastrar novo",
                link: `${based_url}/pages/admin/painel/painel.html?panel=professors`
            }
        ],
        click: true,
        onclick: ()=> window.location.href = `${based_url}/pages/admin/painel/painel.html?panel=professors`
    },
    {
        contents: [
            {
                as: "h1",
                text: "Disciplinas",
            },
            {
                as: "a",
                text: "Cadastrar novo",
                link: `${based_url}/pages/admin/painel/painel.html?panel=subjects`
            }
        ],
        click: true,
        onclick: ()=> window.location.href = `${based_url}/pages/admin/painel/painel.html?panel=subjects`
    }
]

const contentAll = {
    elements: titles,
    itens: itens
}


function page(){
    const div = AppLayout()

    div.append(NavBar(arrayItensOfNav))

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))
    main.append(ListItens(contentAll))

    document.body.append(div)
}

page()