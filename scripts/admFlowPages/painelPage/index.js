import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getAllDisciplinasIfProfessorName } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { displayNameAndProfessor } from "./createTableRows.js";
import { changeTitlePage } from "./changeTitleOfPage.js";
import { changeThOfPage } from "./changeThOfTable.js";
import { based_url } from "../../config.js";
import { navArrowBar } from "../navArrowBar.js";

loader()

backPage()

navArrowBar()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();


    await checkTypeUser('admin')
    

    
    // disciplinas
    changeThOfPage('Nome', 'Professor', 'Quizz', 'Ações')
    const allSubjects = await getAllDisciplinasIfProfessorName()
    changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
    displayNameAndProfessor(allSubjects.disciplinas)
    changeBtnHref('admFlowPages/disciplinaRegister.html')

});

// muda o href do botao de cadastrar
function changeBtnHref(caminho){
    const btn = document.querySelector('.createBtn')
    btn.addEventListener('click', ()=> window.location.href = `${based_url}/html/${caminho}`)
}


