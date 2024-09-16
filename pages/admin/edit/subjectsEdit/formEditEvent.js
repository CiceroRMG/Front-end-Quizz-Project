import { Toaster } from "../../../../components/toaster/toaster.js";
import { takeSubjectIdByParams } from "../../../../scripts/alunoFlowPages/disciplinasPage/takeSubjectIdByParams.js";
import { editDisciplina, getOnBackDisciplinaById } from "../../../../scripts/fetchDbFunctions.js";
import { inputEmptyValidation } from "../../register/subjectsRegister/subjectsFormValidations.js";

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso na edição da disciplina.",
}

const existsToaster = {
    title: "Erro!",
    image: "/components/toaster/img/infoCircle.svg",
    subtitle: "Essa disciplina já existe.",
    style: "info"
}

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao criar a disciplina.",
    style: "error"
}

const semesterErrorToaster = {
    title: "Campo Vazio!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Selecione um semestre!",
    style: "error"
}

let selectedProfessorValue = []
let selectedSemesterValue = []

export async function displayValuesOnInputs(){
    const inputSubjectName = document.querySelector('#inputName')
    const inputYear = document.querySelector('#inputYear')

    const takeDisciplinaById = await getOnBackDisciplinaById(takeSubjectIdByParams())

    inputSubjectName.value = takeDisciplinaById.disciplina.nome
    inputYear.value = takeDisciplinaById.disciplina.ano
    
}

document.addEventListener('selectProfessor', (event) => {
    if (!event.detail.values[0]) {
        return selectedProfessorValue = []
    }
    selectedProfessorValue = event.detail.values[0];
    
});

document.addEventListener('selectSemester', (event) => {
    selectedSemesterValue = event.detail.values[0];
});

export async function formEditEvent(){
    await displayValuesOnInputs()

    const form = document.querySelector(".register-form")
        
    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        let req = {}
    
        const inputSubjectName = document.querySelector('#inputName')
        const inputYear = document.querySelector('#inputYear')
        
        // validações dos formulários
        if(
            !inputEmptyValidation(inputSubjectName.value, '#inputName', '#inputNameError') ||
            !inputEmptyValidation(inputYear.value, '#inputYear', '#inputYearError')
        ) {
            return console.log('Algum dado invalido')
        }

        if(!selectedSemesterValue){
            document.body.append(Toaster(semesterErrorToaster))
            return console.log('Semestre não selecionado');
        }

        if(selectedProfessorValue.length > 0 && selectedSemesterValue.length > 0){
            req = {
                nome: inputSubjectName.value,
                prof_id: selectedProfessorValue,
                ano: inputYear.value,
                semestre: selectedSemesterValue
            }
        } else if(selectedProfessorValue.length > 0){
            req = {
                nome: inputSubjectName.value,
                prof_id: selectedProfessorValue,
                ano: inputYear.value,
            }
        } else if (selectedSemesterValue.length > 0){
            req = {
                nome: inputSubjectName.value,
                ano: inputYear.value,
                semestre: selectedSemesterValue
            }
        } else{
            req = {
                nome: inputSubjectName.value,
                ano: inputYear.value,
            }
        }
    
        const criandoDisciplina = await editDisciplina(req, takeSubjectIdByParams())
        if(criandoDisciplina.status === 200){
            localStorage.setItem('successToaster', 'true')
            return window.location.href = `/pages/admin/painel/subjectsPainel/subjectsPainel.html`
        } else if(criandoDisciplina.status === 409){
            document.body.append(Toaster(existsToaster))
        } else{
            document.body.append(Toaster(errorToaster))
        }
    })
}