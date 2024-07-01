import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getOnBackAllProfessor} from "../../fetchDbFunctions.js";
import { takeSubjectIdByParams } from "../../alunoFlowPages/disciplinasPage/takeSubjectIdByParams.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { putAllProfessorOnOption } from "../disciplinaRegisterPage/putAllProfessorOnOption.js";
import { editDisciplina } from "../../fetchDbFunctions.js";
import { inputValidation } from "../disciplinaRegisterPage/formValidations.js";
import { navArrowBar } from "../navArrowBar.js";
import { displaySuccessModal } from "../successModal.js";
import { displayValuesOnInputs } from "./displayValuesOnInputs.js";
import { displayExistsModal } from "../alreadyExistsModal.js";

loader()

backPage()

navArrowBar()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();
    await checkTypeUser('admin')


    const allProfessor = await getOnBackAllProfessor()
    await putAllProfessorOnOption(allProfessor.professores)
    await displayValuesOnInputs()
});


// parte do formulário
const inputSubjectName = document.querySelector('#subject-name')
const selectProfessor = document.querySelector('#professor-select')
const inputYear = document.querySelector('#data-select')
const selectSemestre = document.querySelector('#semestre-select')


const form = document.querySelector(".form")

form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    let req = {}
    
    // validações dos formulários
    if(
        !inputValidation(inputSubjectName.value, '.name-form', '.subject-name-span') ||
        !inputValidation(inputYear.value, '.data-form', '.data-select-span') ||
        !inputValidation(selectSemestre.value, '.semestre-form', '.semestre-select-span')
    ) {
        return console.log('Algum dado invalido')
    }
    // validando se tem professor ou não
    if(selectProfessor.value !== ""){
        req = {
            nome: inputSubjectName.value,
            prof_id: selectProfessor.value,
            ano: inputYear.value,
            semestre: selectSemestre.value
        }
    } else{
        req = {
            nome: inputSubjectName.value,
            ano: inputYear.value,
            semestre: selectSemestre.value
        }
    }

    const criandoDisciplina = await editDisciplina(req, takeSubjectIdByParams())

    if(criandoDisciplina.status === 200){
        displaySuccessModal("Disciplina Atualizada com Sucesso.")
    } else if(criandoDisciplina.status === 409){
        displayExistsModal("Essa Disciplina Já Existe.")
    } else{
        alert('Erro ao editar a disciplina')
    }
})