import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Header } from "../../../../components/header/header.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { getOnBackQuizzesById, verifyUserAttempts } from "../../../scripts/fetchDbFunctions.js"
import { NavBarStudents } from "../navBarStudents.js"
import { SideCard } from "../../../components/sideCard/sideCard.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { Timer } from "../../../components/timer/timer.js"
import { Dialog } from "../../../components/dialog/dialog.js"
import { formEventStudentQuiz, successSubmit } from "./quizStartForm.js"
import { loader } from "../../../scripts/loader.js"

const req = await getOnBackQuizzesById(takeIdByParams())

const header = await createHeaderObject()

const timerData = {
    time: req.quizz.tempo, 
    id: req.quizz._id,
    action: async ()=>{
        const main = document.querySelector('.main-content')
        main.requestSubmit()
        await successSubmit()
    }
}

const sideCardComponent = {
    title: "Respostas",
    itens: sideCardArray(),
    btn: {
        text: "Entregar",
        type: "primary-md",
        btnType: "button",
        onclick: async ()=>{
            await dialogSubmit()

        }
    }
}

async function dialogSubmit() {
    let dialogData = {}
    const main = document.querySelector('.main-content')

    dialogData = {
        title: "Entregar quiz?",
        paragraph: `Você irá entregar o quiz. Esta ação não pode ser desfeita. Campos Vazios serão considerados como errados. Revise se todas as perguntas estão marcadas.`,
        dialogButtons: [
            {
                text: "Cancelar",
                type: "outline-sm",
                onclick(){
                    const dialog = main.querySelector('.dialog')
                    dialog.remove()
                    dialog.close()
                }
            },
            {
                text: "Entregar",
                type: "primary-sm",
                btnType: "submit",
                onclick: async ()=>{
                    main.requestSubmit()
                    dialog.remove()
                }
            },
        ]
    }
    main.append(Dialog(dialogData))
    const dialog = main.querySelector('.dialog')
    dialog.classList.add('animate-in')
    dialog.showModal()
}

function sideCardArray(){
    let alternativasSideCard = []
    for(let n = 1; n <= 10; n++){
        const object = {
            key: "Pegunta " + n + " :",
            value: "Vazio",
            id: `result-q${n}`
        }
        alternativasSideCard.push(object)
    }

    return alternativasSideCard
}

async function createHeaderObject(){

    const object = {
        title: req.quizz.titulo,
        subtitle: req.quizz.disciplina_id.nome
    }

    return object
}

function updateSideCard(questionNumber, selectedOption) {
    const resultElement = document.getElementById(`result-q${questionNumber}`);
    resultElement.textContent = selectedOption.toUpperCase();
}

function createFormLayout(){
    const form = document.createElement('form')
    form.classList.add('main-content')
    
    return form
}

function QuestionStudent({question = {title, content, id}, awnsers = [{content, id}], indice = null}){

    const div = document.createElement('div')
    div.classList.add('question-box')
    div.id = question.id

    const header = document.createElement('div')
    header.classList.add('question-header')
    header.innerHTML = 
            `
                <h1 class="question-title">${question.title}</h1>
                <p class="question-info">${question.content}<p>

            `

    const awnsersBox = document.createElement('div')
    awnsersBox.classList.add('awnser-box')
    
    let letters = ["a","b","c","d"]
    let i = 0 
    for(const awnser of awnsers) {
        const awnserDiv = document.createElement('input')
        awnserDiv.classList.add('awnser-input')
        awnserDiv.type = "radio"
        awnserDiv.name = `awnsers${question.id}`
        awnserDiv.id = awnser.id
        awnserDiv.value = awnser.id
        awnserDiv.setAttribute("data-awnser", letters[i])
        
        awnserDiv.addEventListener('change', (event) => {
            if(indice){
                updateSideCard(indice, event.target.dataset.awnser)
            }
        });

        const awnserLabel = document.createElement('label')
        awnserLabel.classList.add('awnser-label')
        awnserLabel.setAttribute("for", awnser.id)
        awnserLabel.innerHTML = 
            `   
                <span class="awnser-span">${letters[i]}</span>
                <p class="awnser-content">${awnser.content}<p>
            `

        awnsersBox.append(awnserDiv)
        awnsersBox.append(awnserLabel)
        i += 1
    }

    div.append(header)
    div.append(awnsersBox)

    return div
}

async function checkUserAttemptsAndDate(){
    console.log("entrando aqui");
    
    const attemptsUser = await verifyAttempts()
    const date = await verifyDate()

    if(!attemptsUser || !date){
        window.location.href = `/pages/student/dashboard/dashboard.html`
        return
    }
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

    if(!req){
        return false
    }
    const currentDate = new Date()
    const endDate = new Date(Date.parse(req.quizz.data_fim + 'T00:00:00'))
    const startDate = new Date(Date.parse(req.quizz.data_inicio + 'T00:00:00'))
    
    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    if(currentDate.getTime() > endDate.getTime() || currentDate.getTime() < startDate.getTime()){
        return false
    }

    return true
}

async function quizStartPage(){
    const div = AppLayout()

    const itemNavArray = NavBarStudents.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarStudents)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    const headComponent = Header(header)
    headComponent.classList.add('page-header-box')
    headComponent.append(Timer(timerData))
    headDiv.append(headComponent)
    main.append(headDiv)

    const questionsDiv = document.createElement('div')
    questionsDiv.classList.add('questionsDiv')
    
    let indice = 1
    for(const question of req.quizz.perguntas){
            let awnserArray = []

            const questionObject = {
                content: question.titulo,
                id: question._id,
                title: "Pergunta " + indice
            }
            
            for(const awnser of question.alternativas){
                const object = {
                    content: awnser.conteudo,
                    id: awnser._id
                }

                awnserArray.push(object)
            }
            
            questionsDiv.append(QuestionStudent({question: questionObject, awnsers: awnserArray, indice: indice}))
            indice += 1
    }
    const divvvv = document.createElement('div')
    divvvv.classList.add('space-div')
    questionsDiv.append(divvvv)

    const form = createFormLayout()
    form.append(questionsDiv)


    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.classList.add("sideCard")
    submitBtnDiv.append(SideCard(sideCardComponent))

    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)
    
    loader()
    await checkTypeUser('aluno')
    await checkUserAttemptsAndDate()
    await formEventStudentQuiz()
}

await quizStartPage()

