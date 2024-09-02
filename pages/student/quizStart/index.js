import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { Header } from "../../../../components/header/header.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"

import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { getOnBackQuizzesById } from "../../../scripts/fetchDbFunctions.js"
import { Question } from "../../../components/question/question.js"
import { NavBarStudents } from "../navBarStudents.js"
import { SideCard } from "../../../components/sideCard/sideCard.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"

const header = await createHeaderObject()

const req = await getOnBackQuizzesById(takeIdByParams())

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
    const quizReq = await getOnBackQuizzesById(takeIdByParams())

    const object = {
        title: quizReq.quizz.titulo,
        backBtn: {
            onclick:()=>{
                window.location.href = `/pages/student/quiz/quiz.html?id=${quizReq.quizz._id}`
            }
        },
        subtitle: quizReq.quizz.disciplina_id.nome
    }

    return object
}

function updateSideCard(questionNumber, selectedOption) {
    const resultElement = document.getElementById(`result-q${questionNumber}`);
    resultElement.textContent = selectedOption.toUpperCase();
}

function createFormLayout(){
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


function QuestionStudent({question = {title, content, id}, awnsers = [{content, id}], indice = null}){

    const div = document.createElement('div')
    div.classList.add('question-box')

    const header = document.createElement('div')
    header.classList.add('question-header')
    header.innerHTML = 
            `
                <h1 class="question-title">${question.title}</h1>
                <p id="${question.id}" class="question-info">${question.content}<p>

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


await checkIfValidToken();
await checkTypeUser('aluno')

function quizRegisterPage(){
    const div = AppLayout()

    div.append(NavBarStudents)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(header))
    main.append(headDiv)

    const questionsDiv = document.createElement('div')
    questionsDiv.style.width = "70%"
    questionsDiv.style.display = "flex"
    questionsDiv.style.flexDirection = "column"
    questionsDiv.style.gap = "4rem"
    
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
    submitBtnDiv.append(SideCard(
        {
            title: "Respostas",
            itens: sideCardArray(),
            btn: {
                text: "Entregar",
                type: "primary-md"
            }
        }
    ))
    submitBtnDiv.style.width = "30%"
    submitBtnDiv.style.minWidth = "16.125rem"
    submitBtnDiv.style.display = "flex"
    submitBtnDiv.style.position = "fixed"
    submitBtnDiv.style.right = "4rem"
    submitBtnDiv.style.top = "3rem"
    submitBtnDiv.style.justifyContent = "end"
    submitBtnDiv.style.maxHeight = "38rem"

    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)
}

quizRegisterPage()
