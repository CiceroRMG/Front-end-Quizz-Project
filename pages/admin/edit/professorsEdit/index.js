import { AppLayout } from "../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../components/button/buttom.js"
import { Header } from "../../../../components/header/header.js"
import { Input } from "../../../../components/input/input.js"
import { MainLayout } from "../../../../components/mainLayout/mainLayout.js"
import { Select } from "../../../../components/select/select.js"
import { getAllDisciplinasIfProfessorName, getOnBackDisciplinasOfProfessorById } from "../../../../scripts/fetchDbFunctions.js"
import { checkIfValidToken } from "../../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../../scripts/checkTypeUser.js"
import { NavBarAdmin } from "../../navBarAdm.js"
import { eventFocusInputs } from "../../register/studentsRegister/studentsFormValidations.js"
import { takeIdByParams } from "../studentsEdit/formEditStudent.js"
import { formEditProfessors } from "./formEditProfessors.js"
import { loader } from "../../../../scripts/loader.js"


const professorsHeader = {
    title: "Edição de Professores",
    backBtn: {
        onclick:()=>{
            window.location.href = "/pages/admin/painel/professorsPainel/professorsPainel.html"
        }
    }

}

const inputProfessorName = {
    label: "Nome Completo",
    placeholder: "Nome Sobrenome",
    id: "inputName",
    error: "Digite um nome válido",
    style: "outline"
}

const inputRegistration = {
    label : "Matrícula", 
    info : "A matrícula deve conter 8 digitos numéricos", 
    id : "inputRegistration", 
    placeholder : "8 dígitos numéricos", 
    style: "outline",
    error: "Digite uma matrícula válida.",
}

const inputEmail = {
    label: "Email",
    placeholder: "email@email.com",
    id: "inputEmail",
    error: "Digite um email válido",
    style: "outline",
    type: "email"
}

const selectSubjects = {
    label : "Disciplinas",  
    id : "selectDisciplinas", 
    placeholder : "Disciplinas do usuário",
    info: "O usuário pode ser criado sem disciplinas, deixe em branco para cadastro sem disciplinas",
    options : await createSubjectOptions(),
    type: "multiselect",
    preSelectedOptions: await preSelectedValues()
}

const submitBtn = {
    text: "Editar", 
    type: "primary-l",
}

function createSideBySideInputsDiv(){
    const div = document.createElement('div')
    div.style.display = "flex"
    div.style.widht = "100%"
    div.style.alignItems = "center"
    div.style.gap = "2rem"
    div.style.paddingLeft = "2.4rem"
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
    return form
}

async function createSubjectOptions(){
    let array = []

    const allProfessor = await getAllDisciplinasIfProfessorName()
    if(!allProfessor.disciplinas){
        return
    }
    allProfessor.disciplinas?.forEach((disciplina)=>{
        if(disciplina.prof_id){
            if(disciplina.prof_id._id === takeIdByParams()){
                const object = {
                    text: `${disciplina.nome} | ${disciplina.ano} / ${disciplina.semestre}`,
                    value: disciplina._id
                }
                array.push(object)
            }
        }
        if(!disciplina.prof_id){
            const object = {
                text: `${disciplina.nome} | ${disciplina.ano} / ${disciplina.semestre}`,
                value: disciplina._id
            }
            array.push(object)
        }
    })
    return array
}

async function preSelectedValues() {
    const subjectUserRelation = await getOnBackDisciplinasOfProfessorById(takeIdByParams())
    
    if(subjectUserRelation.disciplinas.length > 0) {
        const professorSubjects = subjectUserRelation.disciplinas
        let subjectsValue = []
        let subjectsContent = []
        for(const disciplina of professorSubjects){
            subjectsValue.push(disciplina._id)
            subjectsContent.push(`${disciplina.nome} | ${disciplina.ano} / ${disciplina.semestre}`)
        }

        const object = 
        {
            content: subjectsContent,
            values: subjectsValue
        }

        return object
    }
}


function studentsEditPage(){
    const div = AppLayout()

    const itemNavArray = NavBarAdmin.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarAdmin)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(professorsHeader))
    main.append(headDiv)

    const form = createFormLayout()
    
    const aboveInputDiv = createSideBySideInputsDiv()
    aboveInputDiv.append(Input(inputProfessorName))
    aboveInputDiv.append(Input(inputRegistration))

    const downInputDiv = createSideBySideInputsDiv()
    downInputDiv.append(Input(inputEmail))
    const selectDiv = document.createElement('div')
    selectDiv.style.display = "flex"
    selectDiv.style.width = "100%"
    selectDiv.style.maxWidth = "49%"
    selectDiv.append(Select(selectSubjects))
    downInputDiv.append(selectDiv)

    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.style.display = "flex"
    submitBtnDiv.style.justifyContent = "center"
    submitBtnDiv.style.margin = "auto 0 0 0"
    submitBtnDiv.append(buttom(submitBtn))

    form.append(aboveInputDiv)
    form.append(downInputDiv)
    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)
    loader()
}

studentsEditPage()

await checkTypeUser('admin')

formEditProfessors()

eventFocusInputs()
