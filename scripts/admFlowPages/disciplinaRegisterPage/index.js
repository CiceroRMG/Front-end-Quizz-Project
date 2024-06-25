import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getOnBackAllProfessor } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { putAllProfessorOnOption } from "./putAllProfessorOnOption.js";
import { registerDisciplina } from "../../fetchDbFunctions.js";
import { based_url } from "../../config.js";

loader()

backPage()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();
    await checkTypeUser('admin')


    const allProfessor = await getOnBackAllProfessor()
    putAllProfessorOnOption(allProfessor.professores)
    

    // mandar os valores do formulario para o back para criar a disciplina, após redirecionar para o painel
});


const form = document.querySelector(".form")

form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    let req = {}

    const inputSubjectName = document.querySelector('#subject-name')
    const selectProfessor = document.querySelector('#professor-select')
    const inputYear = document.querySelector('#data-select')
    const selectSemestre = document.querySelector('#semestre-select')

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
        alert('Disciplina criada com sucesso')
        window.location.href = `${based_url}/html/admFlowPages/painel.html`
    } else if(criandoDisciplina.status === 409){
        alert('Essa disciplina já existe')
    } else{
        alert('Erro ao criar a disciplina')
    }
})