import { AppLayout } from "../../../components/appLayout/appLayout.js"
import { buttom } from "../../../components/button/buttom.js"
import { Header } from "../../../components/header/header.js"
import { Input } from "../../../components/input/input.js"
import { MainLayout } from "../../../components/mainLayout/mainLayout.js"
import { Select } from "../../../components/select/select.js"
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../scripts/checkTypeUser.js"
import { getOnBackDisciplinasOfProfessorByToken } from "../../../scripts/fetchDbFunctions.js"
import { NavBarProfessor } from "../navBarProfessor.js"
import { LongText } from "../../../components/longText/longText.js"


const header = {
    title: "Informações do Quiz",
    backBtn: {
        onclick:()=>{
            window.location.href = "/pages/professor/quizzRegister/quizzRegister.html"
        }
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
    div.style.display = "flex"
    div.style.widht = "100%"
    div.style.alignItems = "center"
    div.style.gap = "2rem"
    return div
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

function createDateInputs(text){
    const div = document.createElement('div')
    div.classList.add('date-div')

    const time = document.createElement('input')
    time.setAttribute('type', 'date')
    time.classList.add('date-input')

    const p = document.createElement('p')
    p.innerText = text

    div.append(time)
    div.append(p)

    return div
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
    
    const aboveInputDiv = createSideBySideInputsDiv()
    aboveInputDiv.append(Select(selectSubjects))
    aboveInputDiv.append(Select(selectQuizzType))

    const downInputDiv = createSideBySideInputsDiv()
    downInputDiv.append(Input(inputAttempts))
    downInputDiv.append(Select(selectMaxTime))

    const dateInputsDiv = createSideBySideInputsDiv()
    dateInputsDiv.append(createDateInputs('Data de início'))
    dateInputsDiv.append(createDateInputs('Data de entrega'))

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.style.display = "flex"
    submitBtnDiv.style.justifyContent = "flex-end"
    submitBtnDiv.style.gap = "1rem"
    submitBtnDiv.style.margin = "auto 0 auto 0"
    submitBtnDiv.append(buttom(saveBtn))
    submitBtnDiv.append(buttom(submitBtn))


    form.append(aboveInputDiv)
    form.append(downInputDiv)
    form.append(dateInputsDiv)
    form.append(LongText(orientations))
    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)
}

quizRegisterPage()

