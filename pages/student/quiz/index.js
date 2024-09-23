import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Header } from "../../../components/header/header.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { InformationsBox } from "../../../components/informations/informations.js"
import { getOnBackQuizzesById, getUserAttempts, verifyUserAttempts } from "../../../scripts/fetchDbFunctions.js"
import { NavBarStudents } from "../navBarStudents.js"
import { SideCard } from "../../../components/sideCard/sideCard.js"
import { Toaster } from "../../../components/toaster/toaster.js"
import { loader } from "../../../scripts/loader.js"

const quizReq = await getOnBackQuizzesById(takeIdByParams())

const header = await createHeaderObject()

const informations = await createObjectInformations()

const userAttemptsData = await getUserAttempts(takeIdByParams())

const awnserToaster = {
    title: "Limite excedido!",
    image: "/components/toaster/img/infoCircle.svg",
    subtitle: "Você ja utilizou todas as tentativas.",
    timeout: 6000,
    style: "info"
}

const sideCardData = {

    title: "Suas Tentativas",
    itens: sideCardAttemptsItens()

}

function sideCardAttemptsItens(){

    const attemptsArray = userAttemptsData.attempts
    let array = []

    let i = 1
    for(const attempt of attemptsArray){

        const object = {
            key: i + "º Tentativa:", 
            value: attempt.nota ? attempt.nota + " / 10" : "0" + " / 10",
            anchor: {
                a: `/pages/student/testResults/testResults.html?id=${attempt.quiz_id}&attempt=${attempt._id}`,
                text: "Ver gabarito"
            }
        }
        

        i += 1

        array.push(object)
    }

    return array
}

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
    let object = {}

    let array = [
        {
            title: "Tentativas",
            content: quizReq.quizz.tentativas === 999 ? "Sem limite" : quizReq.quizz.tentativas
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

    const verifyStudentAttempts = await verifyAttempts()
    const verifyDates = await verifyDate()
    if(!verifyStudentAttempts || !verifyDates){
        object = {
            header: {
                title: "Orientações do Professor",
                subtitle: quizReq.quizz.mensagem ? quizReq.quizz.mensagem : "Não possui orientações"
            }, 
            informations: array,
            btn: {
                text: !verifyStudentAttempts ? "Tentativas esgotadas" : "Começar", 
                type: "primary-md",
            }
        }
    } else{
        object = {
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
                    const verify = await verifyAttempts()
                    if(!verify){
                        return document.body.append(Toaster(awnserToaster))
                    }

                    window.open(`/pages/student/quizStart/quizStart.html?id=${quizId}`)
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

async function verifyAttempts() {

    const userAttempts = await verifyUserAttempts(takeIdByParams())
    
    if(!userAttempts){
        return false
    }

    if(userAttempts.status === 401){
        return false
    }

    return true
}

async function verifyDate() {
    const currentDate = new Date()
    const endDate = new Date(Date.parse(quizReq.quizz.data_fim + 'T00:00:00'))
    const startDate = new Date(Date.parse(quizReq.quizz.data_inicio + 'T00:00:00'))
    
    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    if(currentDate.getTime() > endDate.getTime() || currentDate.getTime() < startDate.getTime()){
        return false
    }

    return true
}


await checkIfValidToken();
await checkTypeUser('aluno')

async function quizPage(){
    const div = AppLayout()

    const itemNavArray = NavBarStudents.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarStudents)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(header))
    main.append(headDiv)

    const mainContent = createContentLayout()

    const infos = InformationsBox(informations)

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.classList.add("sideCard")
    submitBtnDiv.append(SideCard(sideCardData))

    mainContent.append(infos)
    mainContent.append(submitBtnDiv)
    main.append(mainContent)

    document.body.append(div)

    loader()
}

quizPage()
