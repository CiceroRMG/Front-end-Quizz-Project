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

const quizReq = await getOnBackQuizzesById(takeIdByParams())

const header = await createHeaderObject()

const informations = await createObjectInformations()

const userAttemptsData = await getUserAttempts(takeIdByParams())
console.log(userAttemptsData.attempts);


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
                a: `/pages/student/quiz/quiz.html?id=${attempt.quiz_id}`,
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

    const verify = await verifyAttempts()
    if(!verify){
        object = {
            header: {
                title: "Orientações do Professor",
                subtitle: quizReq.quizz.mensagem ? quizReq.quizz.mensagem : "Não possui orientações"
            }, 
            informations: array,
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
                    const verify = await verifyAttempts()
                    if(!verify){
                        return document.body.append(Toaster(awnserToaster))
                    }

                    window.location.href = `/pages/student/quizStart/quizStart.html?id=${quizId}`
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


await checkIfValidToken();
await checkTypeUser('aluno')

async function quizPage(){
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
    submitBtnDiv.append(SideCard(sideCardData))
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
