import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getAllDisciplinas } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { inputValidation } from "./studentFormValidations.js";
import { navArrowBar } from "../navArrowBar.js";
import { displaySuccessModal } from "../successModal.js";
import { displayExistsModal } from "../alreadyExistsModal.js";
import { putAllSubjectsOnOption } from "./putAllSubjectsOnOption.js";

loader()

backPage()

navArrowBar()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();
    await checkTypeUser('admin')


    const allSubjects = await getAllDisciplinas()
    putAllSubjectsOnOption(allSubjects.disciplinas)

    // select das disciplinas
    const selectSubject = document.querySelector('.select-btn')
    selectSubject.addEventListener('click', ()=>{
        const select = document.querySelector('.div-select')
        select.classList.toggle('hidden')
        select.classList.toggle('fade-in')
    })
});


const form = document.querySelector(".form")

form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    let req = {}

    const inputStudentName = document.querySelector('#student-name')
    const selectSubject = document.querySelector('#subject-select')
    const inputEmail = document.querySelector('#email-input')
    const inputMatricula = document.querySelector('#matricula-input')
    
    // validações dos formulários
    if(
        !inputValidation(inputStudentName.value, '.name-form', '.student-name-span') ||
        !inputValidation(inputEmail.value, '.email-form', '.email-span') ||
        !inputValidation(inputMatricula.value, '.matricula-form', '.matricula-span')
    ) {
        return console.log('Algum dado invalido')
    }
    // validando se tem disciplina ou não
    if(selectSubject.value !== ""){
        req = {
            nome: inputStudentName.value,
            email: inputEmail.value,
            matricula: inputMatricula.value
        }

        // se tiver disciplina selecionada, temos que adicionar cada disciplina na relação com o usuario novo
            // 1 - fazer uma requisição de cadastro para rota de usuario
            // 2 - depois que o usuario for criado la no back, pegar a reposta com o userId dele
            // 3 - com o userId do usuario criar uma requisição para rota user disicplina, para cada disciplina selecionada

    } else{
        req = {
            nome: inputStudentName.value,
            email: inputEmail.value,
            matricula: inputMatricula.value
        }
    }

    const criandoAluno = await registerUser(req)

    if(criandoAluno.status === 201){
        displaySuccessModal("Aluno Criado com Sucesso.")
    } else if(criandoAluno.status === 409){
        displayExistsModal("Esse Aluno Já Existe")
    } else{
        displayExistsModal('Ocorreu algum erro ao cadastrar o aluno')
    }
})