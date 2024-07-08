import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getAllDisciplinas, registerUserDisciplina } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { inputValidation, validateAllInputs } from "./studentFormValidations.js";
import { navArrowBar } from "../navArrowBar.js";
import { displaySuccessModal } from "../successModal.js";
import { displayExistsModal } from "../alreadyExistsModal.js";
import { putAllSubjectsOnOption } from "./putAllSubjectsOnOption.js";

import { selectedOptions } from "./putAllSubjectsOnOption.js";
import { selectSubjects } from "./subjectSelect.js";
import { hrefNavLinks } from "../navLinksHref.js";

loader()

backPage()

navArrowBar()

hrefNavLinks()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();
    await checkTypeUser('admin')


    const allSubjects = await getAllDisciplinas()
    putAllSubjectsOnOption(allSubjects.disciplinas)

    selectSubjects()
});


const form = document.querySelector(".form")

form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    let req = {}
    let req2 = {}

    const inputStudentName = document.querySelector('#student-name')
    const selectSubject = document.querySelector('#subject-select')
    const inputEmail = document.querySelector('#email-input')
    const inputMatricula = document.querySelector('#matricula-input')
    
    // valida se os inputs estão vazios ou não
    if(
        !inputValidation(inputStudentName.value, '.name-form', '.student-name-span') ||
        !inputValidation(inputEmail.value, '.email-form', '.email-span') ||
        !inputValidation(inputMatricula.value, '.matricula-form', '.matricula-span')
    ) {
        return console.log('Algum dado vazio')
    }
    // validando se tem disciplina ou não
    if(selectSubject.value !== ""){
        req = {
            nome: inputStudentName.value,
            email: inputEmail.value,
            matricula: inputMatricula.value,
            tipo: "aluno",
            senha: "12345"
        }

        const validations = await validateAllInputs(req)
        if(!validations){
            return console.log('Algum dado invalido')
        }

        const userId = validations.user._id
        let userRelation = ""
        for (const subjectSelect of selectedOptions.values){
            req2 = {
                aluno_id: userId,
                disciplina_id: subjectSelect
            }
            userRelation = await registerUserDisciplina(req2)
        }

        if (userRelation.status === 201){
            return displaySuccessModal("Aluno Criado com Sucesso.")
        } else {
            return displayExistsModal('Ocorreu algum erro ao cadastrar o aluno')
        }

    } else{
        req = {
            nome: inputStudentName.value,
            email: inputEmail.value,
            matricula: inputMatricula.value,
            tipo: "aluno",
            senha: "12345"
        }

        const validations = await validateAllInputs(req)
        if(!validations){
            return console.log('Algum dado invalido')
        }

        if (validations.status === 201){
            return displaySuccessModal("Aluno Criado com Sucesso.")
            
        } else {
            return displayExistsModal('Ocorreu algum erro ao cadastrar o aluno')
        }
    }
})