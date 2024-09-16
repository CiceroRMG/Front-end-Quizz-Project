import { Toaster } from "../../../../components/toaster/toaster.js";
import { registerDisciplina } from "../../../../scripts/fetchDbFunctions.js";
import { inputEmptyValidation, nameValidations, yearValidate } from "./subjectsFormValidations.js";

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso na criação da disciplina.",
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


let selectedProfessorValue = ""
let selectedSemesterValue = ""

document.addEventListener('selectProfessor', (event) => {
    selectedProfessorValue = event.detail.values[0];
});

document.addEventListener('selectSemester', (event) => {
    selectedSemesterValue = event.detail.values[0];
});

export async function formEvent(){

    const form = document.querySelector(".register-form")
        
    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        let req = {}
    
        const inputSubjectName = document.querySelector('#inputName')
        const inputYear = document.querySelector('#inputYear')
        
        if(
            !nameValidations(inputSubjectName.value) ||
            !yearValidate(inputYear.value)
        ) {
            return
        }

        if(!selectedSemesterValue){
            document.body.append(Toaster(semesterErrorToaster))
            return
        }

        req = {
            nome: inputSubjectName.value,
            prof_id: selectedProfessorValue || null,
            ano: inputYear.value,
            semestre: selectedSemesterValue
        }
    
        const criandoDisciplina = await registerDisciplina(req)
    
        if(criandoDisciplina.status === 201){
            document.body.append(Toaster(successToaster))
        } else if(criandoDisciplina.status === 409){
            document.body.append(Toaster(existsToaster))
        } else{
            document.body.append(Toaster(errorToaster))
        }
    })
}
