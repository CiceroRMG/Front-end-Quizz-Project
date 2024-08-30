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


function QuestionStudent({title, awnsers = [{content, correct}]}){


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
    questionsDiv.style.width = "100%"
    questionsDiv.style.display = "flex"
    questionsDiv.style.flexDirection = "column"
    questionsDiv.style.gap = "4rem"
    
    questionsDiv.append(Question({id:"pergunta1", title: "Pergunta 1"}))
    questionsDiv.append(Question({id:"pergunta2", title: "Pergunta 2"}))
    questionsDiv.append(Question({id:"pergunta3", title: "Pergunta 3"}))
    questionsDiv.append(Question({id:"pergunta4", title: "Pergunta 4"}))
    questionsDiv.append(Question({id:"pergunta5", title: "Pergunta 5"}))
    questionsDiv.append(Question({id:"pergunta6", title: "Pergunta 6"}))
    questionsDiv.append(Question({id:"pergunta7", title: "Pergunta 7"}))
    questionsDiv.append(Question({id:"pergunta8", title: "Pergunta 8"}))
    questionsDiv.append(Question({id:"pergunta9", title: "Pergunta 9"}))
    questionsDiv.append(Question({id:"pergunta10", title: "Pergunta 10"}))

    const form = createFormLayout()
    form.append(questionsDiv)


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

    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)
}

quizRegisterPage()
