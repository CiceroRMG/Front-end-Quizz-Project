import { AppLayout } from "../../../../components/appLayout/appLayout.js"
import { buttom } from "../../../../components/button/buttom.js"
import { Header } from "../../../../components/header/header.js"
import { Input } from "../../../../components/input/input.js"
import { MainLayout } from "../../../../components/mainLayout/mainLayout.js"
import { Select } from "../../../../components/select/select.js"
import { deleteQuizzById, getOnBackAllProfessor, getOnBackDisciplinaById } from "../../../../scripts/fetchDbFunctions.js"
import { checkIfValidToken } from "../../../../scripts/pushToLoginPage.js"
import { checkTypeUser } from "../../../../scripts/checkTypeUser.js"
import { NavBarAdmin } from "../../navBarAdm.js"
import { eventFocusInputs } from "../../register/subjectsRegister/subjectsFormValidations.js"
import { formEditEvent } from "./formEditEvent.js"
import { takeIdByParams } from "../studentsEdit/formEditStudent.js"
import { ListItens } from "../../../../components/listItens/listItens.js"
import { Dialog } from "../../../../components/dialog/dialog.js"
import { Empty } from "../../../../components/empty/empty.js"
import { Toaster } from "../../../../components/toaster/toaster.js"


const subjectsHeader = {
    title: "Edição da Disciplina",
    backBtn: {
        onclick:()=>{
            window.location.href = "/pages/admin/painel/subjectsPainel/subjectsPainel.html"
        }
    }

}

const inputSubjectName = {
    label: "Nome",
    placeholder: "Digite o nome da disciplina",
    id: "inputName",
    error: "Digite um nome válido",
    style: "outline"
}

const selectProfessor = {
    label : "Professor", 
    info : "A disciplina não precisa ter um professor", 
    id : "selectProfessor", 
    placeholder : "Selecione um professor", 
    options : await createProfessorOptions(),
    preSelectedOptions: await preSelectedProfessorValues()
}

const inputSubjectYear = {
    label: "Ano",
    placeholder: "Digite o ano: 2024...",
    id: "inputYear",
    error: "Digite um ano válido",
    style: "outline"
}

const selectYear = {
    label : "Semestre",  
    id : "selectSemester", 
    placeholder : "Selecione um semestre", 
    options : [
        {
            text: "Primeiro" ,
            value: 1
        },
        {
            text: "Segundo" ,
            value: 2
        }
    ],
    preSelectedOptions: await preSelectedSemesterValues() 
}

const submitBtn = {
    text: "Editar", 
    type: "primary-l",
    btnType: "submit"
}

const quizzesListItens = {
    elements: [
    {
        as: "p",
        text: "Nome"
    },
    {
        as: "p",
        text: "Ações"
    }
],
    itens: await createQuizzesItensAndDialog()
}

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso no cadastro do quiz.",
    timeout: 6000,
}

const rascunhoToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Seu quiz foi guardado no rascunho",
    timeout: 6000,
}

const deleteToaster = {
    title: "Sucesso ao deletar!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "O quizz foi deletado com sucesso",
    timeout: 6000,
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
    form.style.maxHeight = "100vh"
    form.style.display = "flex"
    form.style.flexDirection = "column"
    form.style.gap = "3rem"
    return form
}

function createQuizzesLayout(){
    const div = document.createElement('div')
    div.style.paddingLeft = "2.4rem"
    div.style.display = "flex"
    div.style.flexDirection = "column"
    div.style.minHeight = "10rem"

    const h2 = document.createElement('h2')
    h2.innerText = "Quizzes"
    h2.style.fontSize = "1rem"
    h2.style.color = "#1C1917"
    h2.style.paddingBottom = "0.9rem"

    div.append(h2)

    return div
}

async function createProfessorOptions(){
    let array = []
    const nullProfessor = {
        text: "Nenhum Professor",
        value: "",
    }
    array.push(nullProfessor)

    const allProfessor = await getOnBackAllProfessor()
    allProfessor.professores.forEach((professor)=>{
        const object = {
            text: professor.nome,
            value: professor._id
        }
        array.push(object)
    })
    return array
}

async function preSelectedProfessorValues() {
    const subjectReq = await getOnBackDisciplinaById(takeIdByParams())
    const subject = subjectReq.disciplina
    
    if(subject.prof_id){

        let professorsValue = []
        let professorsContent = []
    
        professorsValue.push(subject.prof_id._id)
        professorsContent.push(subject.prof_id.nome)
    
        const object = 
        {
            content: professorsContent,
            values: professorsValue
        }
    
        return object

    }   
}

async function preSelectedSemesterValues() {
    const subjectReq = await getOnBackDisciplinaById(takeIdByParams())
    const subject = subjectReq.disciplina
    
    let professorsValue = []
    let professorsContent = []

    professorsValue.push(subject.semestre)
    if(subject.semestre === 1){
        professorsContent.push("Primeiro")
    } else{
        professorsContent.push("Segundo")
    }

    const object = 
    {
        content: professorsContent,
        values: professorsValue
    }

    return object
}

async function createQuizzesItensAndDialog() {
    let array = []
    let dialogData = {}

    const subjectQuizzes = await getOnBackDisciplinaById(takeIdByParams())
    
    if(subjectQuizzes.disciplina.quizes.length > 0){
        for(const quizz of subjectQuizzes.disciplina.quizes) {
            
            const object = {
                contents: [
                    {
                        as: "h1",
                        text: `${quizz.nome}`,
                    },
                    {
                        as: "a",
                        text: "Editar",
                        link: `/pages/admin/edit/quizEdit/quizEdit.html?id=${quizz.quizz_id}`, 
                    },
                    {
                        as: "button",
                        text: "Remover",
                        onclick: ()=>{
                            dialogData = {
                                title: "Tem certeza?",
                                paragraph: `Tem certeza que deseja excluir "${quizz.nome}"? O processo não poderá ser revertido.`,
                                dialogButtons: [
                                    {
                                        text: "Cancelar",
                                        type: "outline-sm",
                                        onclick(){
                                            const main = document.querySelector('.main')
                                            const dialog = main.querySelector('.dialog')
                                            dialog.remove()
                                            dialog.close()
                                        }
                                    },
                                    {
                                        text: "Eliminar",
                                        type: "destructive-sm",
                                        onclick: async () => {
                                                await deleteQuizzById(quizz.quizz_id);
                                                const element = document.getElementById(`${quizz.quizz_id}`) 
                                                element.classList.add('elemento-excluido')
                                                setTimeout(()=>element.remove(), 500)
                                                dialog.remove()
                                        }
                                    },
                                ]
                            }
                            const main = document.querySelector('.main')
                            main.append(Dialog(dialogData))
                            const dialog = main.querySelector('.dialog')
                            dialog.classList.add('animate-in')
                            dialog.showModal()

                        }
                    }
                ], 
                id: quizz.quizz_id,
                style: "space",
                click: false,
            }
            
            array.push(object)

        }
    }

    return array
}


await checkIfValidToken();
await checkTypeUser('admin')


function subjectsEditPage(){
    const div = AppLayout()

    const itemNavArray = NavBarAdmin.querySelectorAll('.nav-item')
    const itemNav = itemNavArray[1]
    itemNav.classList.add('selected')
    div.append(NavBarAdmin)
    const main = MainLayout()
    div.append(main)

    const headDiv = document.createElement('div')
    headDiv.append(Header(subjectsHeader))
    main.append(headDiv)

    const form = createFormLayout()
    
    const aboveInputDiv = createSideBySideInputsDiv()
    aboveInputDiv.append(Input(inputSubjectName))
    aboveInputDiv.append(Select(selectProfessor))

    const downInputDiv = createSideBySideInputsDiv()
    downInputDiv.append(Input(inputSubjectYear))
    downInputDiv.append(Select(selectYear))

    const listQuizzesDiv = createQuizzesLayout()
    listQuizzesDiv.append(ListItens(quizzesListItens))
    const titles = listQuizzesDiv.querySelector('.titles-container')
    titles.style.paddingRight = '5.7rem'
    const ulQuizzes = listQuizzesDiv.querySelector('.ul-itens')
    ulQuizzes.style.maxHeight = "37.7vh"
    ulQuizzes.style.minHeight = "100%"
    ulQuizzes.style.height = "100%"
    ulQuizzes.style.overflowY = "auto"
    const liQuizzes = ulQuizzes.querySelectorAll('li')
    if(liQuizzes.length < 1){
        listQuizzesDiv.append(Empty({title: "A disciplina não possui Quizzes"}))
        titles.style.display = "none"
    }

    if(localStorage.getItem('saveToaster')){
        document.body.append(Toaster(rascunhoToaster))
        localStorage.removeItem('saveToaster')
    }
    if(localStorage.getItem('registerToaster')){
        document.body.append(Toaster(successToaster))
        localStorage.removeItem('registerToaster')
    }
    if(localStorage.getItem('deleteToaster')){
        document.body.append(Toaster(deleteToaster))
        localStorage.removeItem('deleteToaster')
    }


    const submitBtnDiv = document.createElement('div')
    submitBtnDiv.style.display = "flex"
    submitBtnDiv.style.justifyContent = "center"
    submitBtnDiv.style.margin = "auto 0 0 0"
    submitBtnDiv.append(buttom(submitBtn))

    form.append(aboveInputDiv)
    form.append(downInputDiv)
    form.append(listQuizzesDiv)
    form.append(submitBtnDiv)
    main.append(form)

    document.body.append(div)
}

subjectsEditPage()

formEditEvent()

eventFocusInputs()
