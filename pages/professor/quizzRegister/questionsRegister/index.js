import { AppLayout } from "../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../components/button/buttom.js"
import { Header } from "../../../../components/header/header.js"
import { Input } from "../../../../components/input/input.js"
import { MainLayout } from "../../../../components/mainLayout/mainLayout.js"

import { checkIfValidToken } from "../../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../../scripts/checkTypeUser.js"
import { NavBarProfessor } from "../../navBarProfessor.js"
import { getOnBackQuizzesById } from "../../../../scripts/fetchDbFunctions.js"

export function takeIdByParams(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    return id
}

const header = await createHeaderObject()


const inputQuizzName = {
    label: "Pergunta 1",
    placeholder: "Digite aqui a pergunta...",
    id: "question1",
    error: "A pergunta é obrigatória",
    style: "outline"
}

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
                window.location.href = "/pages/professor/quizzRegister/quizzRegister.html"
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
    return form
}


document.addEventListener('DOMContentLoaded', async () => {
    await checkIfValidToken();
    await checkTypeUser('admin')

});

function quizRegisterPage(){
    const div = AppLayout()

    div.append(NavBarProfessor)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(header))
    main.append(headDiv)

    const form = createFormLayout()

    form.append(Input(inputQuizzName))

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.style.display = "flex"
    submitBtnDiv.style.justifyContent = "flex-end"
    submitBtnDiv.style.gap = "1rem"
    submitBtnDiv.style.margin = "auto 0 auto 0"

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
}

quizRegisterPage()