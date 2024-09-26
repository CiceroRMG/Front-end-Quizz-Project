import { AppLayout } from "../../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../../components/button/buttom.js"
import { Header } from "../../../../../components/header/header.js"
import { MainLayout } from "../../../../../components/mainLayout/mainLayout.js"

import { checkIfValidToken } from "../../../../../scripts/pushToLoginPage.js"
import { checkTypeAdminAndProfessor } from "../../../../../scripts/checkTypeUser.js"

import { getOnBackQuizzesById } from "../../../../../scripts/fetchDbFunctions.js"
import { Question } from "../../../../../components/question/question.js"
import { formEventQuestionsEdit } from "./questionsEdit.js"
import { takeIdByParams } from "../../../../../scripts/takeIdByParams.js"
import { NavBarAdmin } from "../../../navBarAdm.js"
import { loader } from "../../../../../scripts/loader.js"


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
                window.location.href = `/pages/admin/edit/quizEdit/quizEdit.html?id=${quizReq.quizz._id}`
            }
        },
        subtitle: quizReq.quizz.disciplina_id.nome
    }

    return object
}

function createFormLayout(){
    const form = document.createElement('form')
    form.classList.add('register-form')
    form.style.width = "100%"
    form.style.height = "100%"
    form.style.display = "flex"
    form.style.flexDirection = "column"
    form.style.gap = "3rem"
    form.style.paddingLeft = "2.4rem"
    form.style.paddingRight = "2.4rem"
    return form
}

async function quizRegisterPage(){
    const div = AppLayout()

    const itemNavArray = NavBarAdmin.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarAdmin)
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

    const registerButton = buttom(submitBtn)
    registerButton.id = "registerBtn"
    registerButton.name = "action"

    submitBtnDiv.append(registerButton)

    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)

    formEventQuestionsEdit()
    loader()
}

quizRegisterPage()
await checkTypeAdminAndProfessor('admin', 'professor')
