import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { getAllDisciplinasIfProfessorName, getAllStudents } from "../../fetchDbFunctions.js";
import { loader } from "../../loader.js"
import {backPage} from "../../alunoFlowPages/disciplinasPage/backBtn.js"
import { changeTitlePage } from "./changeTitleOfPage.js";
import { changeThOfPage } from "./changeThOfTable.js";
import { changeBtnHref } from "./registerBtn.js";
import { navArrowBar } from "../navArrowBar.js";
import { iterateArrays } from "./iterateArrays.js";
import { createSubjectsTableRows } from "./createTableRows.js";
import { createStudentsTableRows } from "./createStudentsTableRows.js";

loader()

backPage()

navArrowBar()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();


    await checkTypeUser('admin')
    
    // alunos
    changeBtnHref('admFlowPages/studentRegister.html')
    changeThOfPage('Matrícula', 'Nome', 'Disciplinas', 'Ações')
    const allStudents = await getAllStudents()
    if(!allStudents.alunos){
        changeTitlePage("0", "Alunos")
        return console.log('Lista vazia')
    }
    changeTitlePage(allStudents.alunos.length, "Alunos")
    iterateArrays(allStudents.alunos, createStudentsTableRows)


    // // disciplinas
    // changeBtnHref('admFlowPages/disciplinaRegister.html')
    // changeThOfPage('Nome', 'Professor', 'Quizz', 'Ações')
    // const allSubjects = await getAllDisciplinasIfProfessorName()
    // if(!allSubjects.disciplinas){
    //     changeTitlePage("0", "Disciplinas")
    //     return console.log('Lista vazia')
    // }
    // changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
    // iterateArrays(allSubjects.disciplinas, createSubjectsTableRows)

});
