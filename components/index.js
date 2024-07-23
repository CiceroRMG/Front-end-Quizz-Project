import { Header } from "./header/header.js"
import { MainLayout } from "./mainLayout/mainLayout.js"
import { NavBar } from "./nav-bar/nav-bar.js"
import { ListItens } from "./listItens/listItens.js"
import { AppLayout } from "./appLayout/appLayout.js"
import { Toaster } from "./toaster/toaster.js"
import { Input } from "./input/input.js"
import { Select } from "./select/select.js"

const arrayItensOfNav = {
    mainComponents: [
        {
            img: "/components/nav-bar/img/house.svg",
            text: "Dashboard",
            as: "a",
            link: "#"
        },
        {
            img: "/components/nav-bar/img/book.svg",
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
        },
        {
            img: "/components/nav-bar/img/book.svg",
            text: "Notas",
            as: "button",
            link: "#",
        }
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
    image: "/components/toaster/img/checkCircle.svg"
}

const inputData = {
    label: "Senha",
    style: "outline",
    info: "Qualquer coisa",
    id: "input-password",
    error: "Esse aqui é o erro",
    type: "password"
}

const selectData = {
    label: "multiselect",
    info: "Qualquer coisa",
    id: "teste",
    type: "multiselect",
    placeholder: "Selecione alguma opção",
    options: [
        {
            text: "Teste",
            value: "id"
        },
        {
            text: "Teste 1",
            value: "id5"
        },
        {
            text: "Teste 2",
            value: "id2"
        },
        {
            text: "Teste 3",
            value: "id3"
        },
        {
            text: "Teste 4",
            value: "id5"
        },
        {
            text: "Teste 696",
            value: "id6"
        },
        {
            text: "Teste 5454",
            value: "id6"
        },
        {
            text: "Teste 12",
            value: "id6"
        },
        {
            text: "Teste 651",
            value: "id6"
        },
        {
            text: "Teste 44",
            value: "id6"
        },
        {
            text: "Teste 65165",
            value: "id6"
        },
        {
            text: "Teste 78",
            value: "id6"
        }
    ]
}

const selectData2 = {
    label: "normal",
    info: "Qualquer coisa",
    id: "testeand",
    type: "default",
    placeholder: "Selecione alguma opção",
    options: [
        {
            text: "Teste",
            value: "id"
        },
        {
            text: "Teste 1",
            value: "id5"
        },
        {
            text: "Teste 2",
            value: "id2"
        },
        {
            text: "Teste 3",
            value: "id3"
        },
        {
            text: "Teste 4",
            value: "id5"
        },
        {
            text: "Teste 696",
            value: "id6"
        },
        {
            text: "Teste 5454",
            value: "id6"
        },
        {
            text: "Teste 12",
            value: "id6"
        },
        {
            text: "Teste 651",
            value: "id6"
        },
        {
            text: "Teste 44",
            value: "id6"
        },
        {
            text: "Teste 65165",
            value: "id6"
        },
        {
            text: "Teste 78",
            value: "id6"
        }
    ]
}

function page(){
    const div = AppLayout()

    div.append(NavBar(arrayItensOfNav))

    const main = MainLayout()
    div.append(main)
    main.append(Header(headerContent))
    main.append(ListItens(contentAll))
    main.append(Toaster(toasterContent))
    main.append(Input(inputData))
    main.append(Select(selectData))
    main.append(Select(selectData2))

    document.body.append(div)
}

page()