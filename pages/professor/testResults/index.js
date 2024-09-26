import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Header } from "../../../../components/header/header.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { getOnBackQuizzesById, getUserAttemptById } from "../../../scripts/fetchDbFunctions.js"
import { SideCard } from "../../../components/sideCard/sideCard.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { NavBarProfessor } from "../navBarProfessor.js"
import { loader } from "../../../scripts/loader.js"

const req = await getOnBackQuizzesById(takeIdByParams())

const header = await createHeaderObject()

const attemptReq = await getUserAttemptById(takeAttemptByParams())

const sideCardComponent = {
    title: "Respostas",
    itens: sideCardArray(),
}

function putStudentResponses(){
    let indice = 1
    const attemptArray = attemptReq.attempt.respostas
    for(const awnser of attemptArray){
        const selectedLabel = document.querySelector(`label[for="${awnser.alternativa_id}"]`)
        const selectedAwnser = document.getElementById(awnser.alternativa_id)
        const sideCardSelect = document.getElementById(`result-q${indice}`)
        if(!selectedAwnser.checked){
            selectedAwnser.style.backgroundColor = "#f8c3c3d6"
            selectedLabel.style.backgroundColor = "#f8c3c3d6"
            sideCardSelect.style.color = "#EF4444"
        } else{
            sideCardSelect.style.color = "#059669"
        }
        updateSideCard(indice, selectedAwnser.dataset.awnser)
        indice += 1
    }

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

export function takeAttemptByParams(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('attempt')
    return id
}

async function createHeaderObject(){

    const object = {
        title: req.quizz.titulo,
        subtitle: req.quizz.disciplina_id.nome,
        backBtn: {
            onclick: ()=>{
                window.location.href = `/pages/professor/quiz/quiz.html?id=${req.quizz._id}`
            }
        }
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

async function QuestionStudentResults({question = {title, content, id}, awnsers = [{content, id, selected}], indice = null}){

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
        if(awnser.selected) {
            awnserDiv.checked = true

        }
        awnserDiv.disabled = true
       

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

async function quizStartPage(){
    const div = AppLayout()

    const itemNavArray = NavBarProfessor.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarProfessor)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    const headComponent = Header(header)
    headComponent.classList.add('page-header-box')
    const studentName = document.createElement('p')
    studentName.innerText = "Aluno : " + attemptReq.attempt.aluno_id.nome
    studentName.classList.add('name-student')
    headComponent.append(studentName)
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
                    id: awnser._id,
                    selected: awnser.correta
                }
            
            awnserArray.push(object)
        }
        
        questionsDiv.append(await QuestionStudentResults({question: questionObject, awnsers: awnserArray, indice: indice}))
        indice += 1
    }
    const divvvv = document.createElement('div')
    divvvv.classList.add('space-div')
    questionsDiv.append(divvvv)

    const form = createFormLayout()
    form.append(questionsDiv)


    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.classList.add("sideCard")
    const sideCardItem = SideCard(sideCardComponent)
    const p = document.createElement('p')
    p.innerText = "Nota : " +  attemptReq.attempt.nota + " / 10"
    sideCardItem.append(p)
    submitBtnDiv.append(sideCardItem)

    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)

    loader()
}

await quizStartPage()
putStudentResponses()
await checkTypeUser('professor')