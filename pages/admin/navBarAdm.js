import { NavBar } from "../../components/nav-bar/nav-bar.js"
import { based_url } from "../../scripts/config.js"

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

const NavBarAdmin = NavBar(arrayItensOfNav)

export { NavBarAdmin }