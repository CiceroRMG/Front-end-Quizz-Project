import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { buttom } from "../../../components/button/buttom.js"
import { Header } from "../../../components/header/header.js"
import { Input } from "../../../components/input/input.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { Select } from "../../../components/select/select.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeAdminAndProfessor, checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { getOnBackDisciplinasOfProfessorByToken, getOnBackQuizzesById } from "../../../scripts/fetchDbFunctions.js"
import { NavBarProfessor } from "../navBarProfessor.js"
import { LongText } from "../../../components/longText/longText.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { formEventQuizEdit } from "./quizEditForm.js"
import { eventFocusInputs } from "../quizzRegister/quizRegisterValidations.js"
import { loader } from "../../../scripts/loader.js"

const quizInfos = await quizObject()

const header = {
    title: "Informações do Quiz",
    backBtn: {
        onclick:()=>{
            localStorage.removeItem('registerToaster')
            window.location.href = `/pages/professor/subject/subject.html?id=${quizInfos.disciplina_id._id}`
        }
    }

}

const inputQuizzName = {
    placeholder: "Nome do quiz",
    id: "inputName",
    error: "Digite um nome válido",
    style: "outline",
    value: quizInfos.titulo
}

const selectSubjects = {  
    id : "selectDisciplinas", 
    placeholder : "Selecione a disciplina",
    options : [],
    preSelectedOptions: {
        content: [`${quizInfos.disciplina_id.nome} | ${quizInfos.disciplina_id.ano} / ${quizInfos.disciplina_id.semestre}`], 
        values: [quizInfos.disciplina_id._id]
    }
}

const selectQuizzType = { 
    id : "selectQuizType", 
    placeholder : "Selecione o tipo de quiz",
    options : [
        {
            text: "exercicio",
            value: "exercicio"
        },
        {
            text: "prova",
            value: "prova"
        }
    ],
    preSelectedOptions: {
        content: [quizInfos.tipo], 
        values: [quizInfos.tipo]
    }
}

const inputAttempts = { 
    id : "inputAttempts", 
    placeholder : "Digite o número de tentativas",
    info: "Para um número ilimitado de tentativas deixe o campo em branco",
    error: "Digite um número válido",
    style: "outline",
    type: "number",
    value: quizInfos.tentativas
}


const selectMaxTime = { 
    id : "selectTime", 
    placeholder : "Tempo máximo do quiz",
    options : [
        {
            text: "30 minutos",
            value: 30
        },
        {
            text: "1 hora",
            value: 60
        },
        {
            text: "1 hora e 30 minutos",
            value: 90
        },
        {
            text: "2 horas",
            value: 120
        },
        {
            text: "2 horas e 30 minutos",
            value: 150
        },
        {
            text: "3 horas",
            value: 180
        },
        {
            text: "3 horas e 30 minutos",
            value: 210
        },
        {
            text: "4 horas",
            value: 240
        },
    ],
    preSelectedOptions: {
        content: [minutesToHours(quizInfos.tempo)], 
        values: [quizInfos.tempo]
    }
}

function minutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let result = '';

    if (hours > 0) {
        if(hours < 2){
            result += `${hours} hora`
        } else{
            result += `${hours} horas`;
        }
    }
    if (remainingMinutes > 0) {
        if (hours > 0) {
            result += ' e ';
        }
        result += `${remainingMinutes} minutos`;
    }

    return result;
}

async function quizObject(){
    const object = await getOnBackQuizzesById(takeIdByParams())
    const quizRes = object.quizz

    return quizRes
}

const orientations = {
    placeholder: "Escreva aqui as orientações para o aluno...",
    id: "inputTextArea",
    value: quizInfos.mensagem
}

const saveBtn = {
    text: "Guardar Rascunho", 
    type: "outline-md",
    btnType: "submit",
}

const submitBtn = {
    text: "Criar Perguntas", 
    type: "primary-md",
    btnType: "submit"
}

function createSideBySideInputsDiv(){
    const div = document.createElement('div')
    div.classList.add('sideBySideInputs')
    
    return div
}

function createFormLayout(){
    const form = document.createElement('form')
    form.classList.add('register-form')
    return form
}

function createDateInputs(text, id, value){
    const div = document.createElement('div')
    div.classList.add('date-div')
    div.style.position = "relative"

    const time = document.createElement('input')
    time.setAttribute('type', 'date')
    time.classList.add('date-input')
    time.id = id
    time.value = value

    const p = document.createElement('p')
    p.innerText = text

    const spanError = document.createElement('span')
    spanError.classList.add("input-error")
    spanError.classList.add("hidden")
    spanError.classList.add("notLabel")
    spanError.id = id + "Error"

    div.append(time)
    div.append(p)
    div.append(spanError)

    return div
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

    form.append(Input(inputQuizzName))
    
    const aboveInputDiv = createSideBySideInputsDiv()
    aboveInputDiv.append(Select(selectSubjects))
    aboveInputDiv.append(Select(selectQuizzType))

    const downInputDiv = createSideBySideInputsDiv()
    downInputDiv.append(Input(inputAttempts))
    downInputDiv.append(Select(selectMaxTime))

    const dateInputsDiv = createSideBySideInputsDiv()
    dateInputsDiv.append(createDateInputs('Data de início', 'inputStartDate', quizInfos.data_inicio))
    dateInputsDiv.append(createDateInputs('Data de entrega', 'inputFinishDate', quizInfos.data_fim))

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.classList.add('submitBtnDiv')

    const saveButton = buttom(saveBtn)
    saveButton.id = "saveBtn"
    saveButton.name = "action"

    const registerButton = buttom(submitBtn)
    registerButton.id = "registerBtn"
    registerButton.name = "action"

    submitBtnDiv.append(saveButton)
    submitBtnDiv.append(registerButton)


    form.append(aboveInputDiv)
    form.append(downInputDiv)
    form.append(dateInputsDiv)
    form.append(LongText(orientations))
    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)

    loader()
}

quizRegisterPage()

await checkTypeAdminAndProfessor('admin', 'professor')

formEventQuizEdit()
eventFocusInputs()