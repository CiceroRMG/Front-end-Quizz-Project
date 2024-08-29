import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { buttom } from "../../../components/button/buttom.js"
import { Header } from "../../../components/header/header.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { ListItens } from "../../../components/listItens/listItens.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { Empty } from "../../../components/empty/empty.js"
import { InformationsBox } from "../../../components/informations/informations.js"
import { deleteQuizzById, getOnBackQuizzesById } from "../../../scripts/fetchDbFunctions.js"
import { NavBarStudents } from "../navBarStudents.js"
import { SideCard } from "../../../components/sideCard/sideCard.js"


const header = await createHeaderObject()

const informations = await createObjectInformations()


async function createHeaderObject(){
    const quizReq = await getOnBackQuizzesById(takeIdByParams())
    let titleContent = ""
    if(quizReq.quizz.rascunho){
        titleContent = `${quizReq.quizz.titulo} (Rascunho)`
    } else{
        titleContent = `${quizReq.quizz.titulo}`
    }

    const object = {
        title: titleContent,
        backBtn: {
            onclick:()=>{
                window.location.href = `/pages/student/subject/subject.html?id=${quizReq.quizz.disciplina_id._id}`
            }
        },
        subtitle: quizReq.quizz.disciplina_id.nome
    }

    return object
}

async function createObjectInformations(){
    
    const quizReq = await getOnBackQuizzesById(takeIdByParams())

    let array = [
        {
            title: "Tentativas",
            content: quizReq.quizz.tentativas
        },
        {
            title: "Tempo máximo",
            content: (quizReq.quizz.tempo + " minutos"),
        },
        {
            title: "Data de entrega",
            content: formatDate(quizReq.quizz.data_fim)
        },
        {
            title: "Modalidade do Quiz",
            content: quizReq.quizz.tipo
        },
    ]

    

    const object = {
        header: {
            title: "Orientações do Professor",
            subtitle: quizReq.quizz.mensagem ? quizReq.quizz.mensagem : "Não possui orientações"
        }, 
        informations: array,
        btn: {
            onclick: async ()=>{
                await dialogStart()  
            },
            text: "Começar",
            type: "primary-md",
        }
    }

    return object
}

function formatDate(date){
    const [ano, mes, dia] = date.split('-');

    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada
}

function createContentLayout(){
    const form = document.createElement('div')
    form.classList.add('main-content')
    form.style.width = "100%"
    form.style.height = "100%"
    form.style.maxHeight = "100vh"
    form.style.display = "flex"
    form.style.justifyContent = "space-between"
    form.style.gap = "3rem"
    form.style.paddingLeft = "2.3rem"
     form.style.paddingRight = "2.3rem"
    
    return form
}

async function dialogStart() {
    let dialogData = {}
    const quizId = takeIdByParams()

    dialogData = {
        title: "Deseja começar agora?",
        paragraph: `Ao clicar no botão o quiz começará imediatamente e deve ser entregue para pode sair.`,
        dialogButtons: [
            {
                text: "Cancelar",
                type: "outline-sm",
                onclick(){
                    const main = document.querySelector('.main')
                    const dialog = main.querySelector('.dialog')
                    dialog.remove()
                    dialog.close()
                }
            },
            {
                text: "Começar",
                type: "primary-sm",
                onclick: async () => {
                    dialog.remove()
                    window.location.href = `/pages/professor/quizStart/quizStart.html?id=${quizId}`
                }
            },
        ]
    }
    const main = document.querySelector('.main')
    main.append(Dialog(dialogData))
    const dialog = main.querySelector('.dialog')
    dialog.classList.add('animate-in')
    dialog.showModal()
}


await checkIfValidToken();
await checkTypeUser('aluno')

function quizPage(){
    const div = AppLayout()

    div.append(NavBarStudents)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(header))
    main.append(headDiv)

    const mainContent = createContentLayout()

    const infos = InformationsBox(informations)
    infos.style.paddingRight = "1rem"
    infos.style.width = "70%"
    infos.style.minWidth = "17.125rem"

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.classList.add("sideCard")
    submitBtnDiv.append(SideCard(
        {
            title: "Suas Tentativas",
        }
    ))
    submitBtnDiv.style.width = "30%"
    submitBtnDiv.style.minWidth = "16.125rem"
    submitBtnDiv.style.display = "flex"
    submitBtnDiv.style.justifyContent = "end"
    submitBtnDiv.style.maxHeight = "38rem"


    mainContent.append(infos)
    mainContent.append(submitBtnDiv)
    main.append(mainContent)

    document.body.append(div)
}

quizPage()
