import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getAllDisciplinasIfProfessorName } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { displayNameAndProfessor } from "./createTableRows.js";
import { changeTitlePage } from "./changeTitleOfPage.js";
import { changeThOfPage } from "./changeThOfTable.js";

loader()

backPage()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();


    await checkTypeUser('admin')
    

    
    // disciplinas
    changeThOfPage('Nome', 'Professor', 'Quizz', 'Ações')
    const allSubjects = await getAllDisciplinasIfProfessorName()
    console.log(allSubjects.disciplinas)
    changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
    displayNameAndProfessor(allSubjects.disciplinas)

});


        
