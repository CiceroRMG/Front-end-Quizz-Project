import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getOnBackAllProfessor } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { putAllProfessorOnOption } from "./putAllProfessorOnOption.js";
import { registerDisciplina } from "../../fetchDbFunctions.js";
import { inputValidation } from "./formValidations.js";
import { navArrowBar } from "../navArrowBar.js";
import { displaySuccessModal } from "../successModal.js";
import { displayExistsModal } from "../alreadyExistsModal.js";
import { hrefNavLinks } from "../navLinksHref.js";

loader()

backPage()

navArrowBar()

hrefNavLinks()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();
    await checkTypeUser('admin')


    const allProfessor = await getOnBackAllProfessor()
    putAllProfessorOnOption(allProfessor.professores)
    
});


const form = document.querySelector(".form")

form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    let req = {}

    const inputSubjectName = document.querySelector('#subject-name')
    const selectProfessor = document.querySelector('#professor-select')
    const inputYear = document.querySelector('#data-select')
    const selectSemestre = document.querySelector('#semestre-select')
    
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

    const criandoDisciplina = await registerDisciplina(req)

    if(criandoDisciplina.status === 201){
        displaySuccessModal("Disciplina Criada com Sucesso.")
    } else if(criandoDisciplina.status === 409){
        displayExistsModal("Essa Disciplina Já Existe")
    } else{
        displayExistsModal('Ocorreu algum erro ao criar a disciplina')
    }
})