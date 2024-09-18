import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Header } from "../../../components/header/header.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { based_url } from "../../../scripts/config.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { NavBarAdmin } from "../navBarAdm.js"


const headerContent = {
    title: "Dashboard",
    subtitle: "Administrador"
}

const titles = [
    {
        as: "h1",
        text: "Painel"
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
                link: `${based_url}/pages/admin/register/studentsRegister/studentsRegister.html`
            }
        ],
        click: true,
        onclick: ()=> window.location.href = `${based_url}/pages/admin/painel/studentsPainel/studentsPainel.html`
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
                link: `${based_url}/pages/admin/register/professorsRegister/professorsRegister.html`
            }
        ],
        click: true,
        onclick: ()=> window.location.href = `${based_url}/pages/admin/painel/professorsPainel/professorsPainel.html`
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
                link: `${based_url}/pages/admin/register/subjectsRegister/subjectsRegister.html`
            }
        ],
        click: true,
        onclick: ()=> window.location.href = `${based_url}/pages/admin/painel/subjectsPainel/subjectsPainel.html`
    }
]

const contentAll = {
    elements: titles,
    itens: itens
}

await checkIfValidToken();

if(await checkTypeUser('admin')){
    page()
}

function page(){
    const div = AppLayout()

    div.append(NavBarAdmin)

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))
    main.append(ListItens(contentAll))

    document.body.append(div)
}
