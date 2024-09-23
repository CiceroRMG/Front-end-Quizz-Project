import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { buttom } from "../../../components/button/buttom.js"
import { Header } from "../../../components/header/header.js"
import { Input } from "../../../components/input/input.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { Select } from "../../../components/select/select.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { getOnBackDisciplinaById, getOnBackDisciplinasOfProfessorByToken } from "../../../scripts/fetchDbFunctions.js"
import { NavBarProfessor } from "../navBarProfessor.js"
import { LongText } from "../../../components/longText/longText.js"
import { formEventQuiz } from "./quizzRegisterForm.js"
import { takeIdByParams } from "../../../scripts/takeIdByParams.js"
import { eventFocusInputs } from "./quizRegisterValidations.js"
import { loader } from "../../../scripts/loader.js"


const header = {
    title: "Informações do Quiz",
    backBtn: {
        onclick: await BackBtnHrefIfHaveParams()
    }

}

const inputQuizzName = {
    placeholder: "Nome do quiz",
    id: "inputName",
    error: "Digite um nome válido",
    style: "outline"
}


const selectSubjects = {  
    id : "selectDisciplinas", 
    placeholder : "Selecione a disciplina",
    options : await createSubjectOptions(),
    preSelectedOptions: await putPreSelectSubjectIfHaveParams()
}

const selectQuizzType = { 
    id : "selectQuizType", 
    placeholder : "Selecione o tipo de quiz",
    options : [
        {
            text: "Exercício",
            value: "exercicio"
        },
        {
            text: "Prova",
            value: "prova"
        }
    ]
}

const inputAttempts = { 
    id : "inputAttempts", 
    placeholder : "Digite o número de tentativas",
    info: "Para um número ilimitado de tentativas deixe o campo em branco",
    error: "Digite um número válido",
    style: "outline",
    type: "number"
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
            text: "1h e 30min",
            value: 90
        },
        {
            text: "2 horas",
            value: 120
        },
        {
            text: "2h e 30min",
            value: 150
        },
        {
            text: "3h",
            value: 180
        },
        {
            text: "3h e 30min",
            value: 210
        },
        {
            text: "4h",
            value: 240
        },
    ]
}

const orientations = {
    placeholder: "Escreva aqui as orientações para o aluno..."
}

const saveBtn = {
    text: "Guardar Rascunho", 
    type: "outline-md",
    btnType: "submit"
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

function createDateInputs(text, id){
    const div = document.createElement('div')
    div.classList.add('date-div')
    div.style.position = "relative"

    const time = document.createElement('input')
    time.setAttribute('type', 'date')
    time.classList.add('date-input')
    time.id = id

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

function putDateOnInputs(){
    const dateInput = document.getElementById('inputStartDate');
    const dateInputFinish = document.getElementById('inputFinishDate');

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    dateInput.value = formattedDate;
    dateInputFinish.value = formattedDate;
}

async function putPreSelectSubjectIfHaveParams() {
    const subjectId = takeIdByParams()
    let preSelect = {}
    if(subjectId){
        const subject = await getOnBackDisciplinaById(subjectId)
        if(subject){
            preSelect = {
                content: [subject.disciplina.nome + " | " + subject.disciplina.ano + " / " + subject.disciplina.semestre], 
                values: [subject.disciplina._id]
            }
        }
    }

    return preSelect
}

async function BackBtnHrefIfHaveParams() {
    const subjectId = takeIdByParams()
    let onClickAction
    if(subjectId){
        const subject = await getOnBackDisciplinaById(subjectId)   
        onClickAction = () => {
                window.location.href = `/pages/professor/subject/subject.html?id=${subject.disciplina._id}`
        }
    } else {
        onClickAction = () => {
            window.location.href = "/pages/professor/dashboard/dashboard.html"
        }
    }
    return onClickAction
}

async function createSubjectOptions(){
    let array = []

    const allProfessorSubjects = await getOnBackDisciplinasOfProfessorByToken()
    allProfessorSubjects.disciplinas.forEach((disciplina)=>{
        const object = {
            text: `${disciplina.nome} | ${disciplina.ano} / ${disciplina.semestre}`,
            value: disciplina._id
        }
        array.push(object)   
    })

    return array
}

await checkIfValidToken();
await checkTypeUser('professor')

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
    dateInputsDiv.append(createDateInputs('Data de início', 'inputStartDate'))
    dateInputsDiv.append(createDateInputs('Data de entrega', 'inputFinishDate'))

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
putDateOnInputs()

formEventQuiz()
eventFocusInputs()