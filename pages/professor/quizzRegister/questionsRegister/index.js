import { AppLayout } from "../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../components/button/buttom.js"
import { Header } from "../../../../components/header/header.js"
import { MainLayout } from "../../../../components/mainLayout/mainLayout.js"
import { checkTypeUser } from "../../../../scripts/checkTypeUser.js"
import { NavBarProfessor } from "../../navBarProfessor.js"
import { getOnBackQuizzesById } from "../../../../scripts/fetchDbFunctions.js"
import { Question } from "../../../../components/question/question.js"
import { formEventQuestions } from "./questionsRegisterForm.js"
import { loader } from "../../../../scripts/loader.js"

export function takeIdByParams(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    return id
}

const header = await createHeaderObject()

const saveBtn = {
    text: "Guardar Rascunho", 
    type: "outline-md",
    btnType: "submit"
}

const submitBtn = {
    text: "Finalizar", 
    type: "primary-md",
    btnType: "submit"
}

async function createHeaderObject(){
    const quizReq = await getOnBackQuizzesById(takeIdByParams())

    const object = {
        title: quizReq.quizz.titulo,
        backBtn: {
            onclick:()=>{
                window.location.href = `/pages/professor/quizEdit/quizEdit.html?id=${quizReq.quizz._id}`
            }
        },
        subtitle: quizReq.quizz.disciplina_id.nome
    }

    return object
}

function createFormLayout(){
    const form = document.createElement('form')
    form.classList.add('register-form')
    return form
}

function quizRegisterPage(){
    const div = AppLayout()

    const itemNavArray = NavBarProfessor.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[2]
    itemNav.classList.add('selected')
    div.append(NavBarProfessor)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(header))
    main.append(headDiv)

    const form = createFormLayout()

    form.append(Question({id:"pergunta1", title: "Pergunta 1"}))
    form.append(Question({id:"pergunta2", title: "Pergunta 2"}))
    form.append(Question({id:"pergunta3", title: "Pergunta 3"}))
    form.append(Question({id:"pergunta4", title: "Pergunta 4"}))
    form.append(Question({id:"pergunta5", title: "Pergunta 5"}))
    form.append(Question({id:"pergunta6", title: "Pergunta 6"}))
    form.append(Question({id:"pergunta7", title: "Pergunta 7"}))
    form.append(Question({id:"pergunta8", title: "Pergunta 8"}))
    form.append(Question({id:"pergunta9", title: "Pergunta 9"}))
    form.append(Question({id:"pergunta10", title: "Pergunta 10"}))

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.style.display = "flex"
    submitBtnDiv.style.justifyContent = "flex-end"
    submitBtnDiv.style.gap = "1rem"
    submitBtnDiv.style.margin = "auto 0 auto 0"
    submitBtnDiv.style.paddingBottom = "2rem"

    const saveButton = buttom(saveBtn)
    saveButton.id = "saveBtn"
    saveButton.name = "action"

    const registerButton = buttom(submitBtn)
    registerButton.id = "registerBtn"
    registerButton.name = "action"

    submitBtnDiv.append(saveButton)
    submitBtnDiv.append(registerButton)

    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)

    loader()
}

quizRegisterPage()
await checkTypeUser('professor')
formEventQuestions()