import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getAllDisciplinasIfProfessorName } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { displayNameAndProfessor } from "./createTableRows.js";
import { changeTitlePage } from "./changeTitleOfPage.js";
import { changeThOfPage } from "./changeThOfTable.js";
import { changeBtnHref } from "./registerBtn.js";
import { navArrowBar } from "../navArrowBar.js";

loader()

backPage()

navArrowBar()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();


    await checkTypeUser('admin')
    

    
    // disciplinas
    changeBtnHref('admFlowPages/disciplinaRegister.html')
    changeThOfPage('Nome', 'Professor', 'Quizz', 'Ações')
    const allSubjects = await getAllDisciplinasIfProfessorName()
    if(!allSubjects.disciplinas){
        changeTitlePage("0", "Disciplinas")
        return console.log('Lista vazia')
    }
    changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
    displayNameAndProfessor(allSubjects.disciplinas)

});
