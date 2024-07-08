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
    await checkIfValidToken();
    await checkTypeUser('admin')


    const params = new URLSearchParams(window.location.search);
    const panel = params.get('panel');
    const tbody = document.querySelector(".tbody")
    const studentsBtnNav = document.getElementById("alunos-nav-a")
    const professorsBtnNav = document.getElementById("professores-nav-a")
    const disciplinasBtnNav = document.getElementById("disciplinas-nav-a")
    
    switch(panel) {
        case 'students':
            await loadStudentsPanel();
            break;
        case 'subjects':
            await loadSubjectsPanel();
            break;
        // case 'teachers':
        //     await loadTeachersPanel();
        //     break;
        default:
            console.log('Painel não especificado');
            await loadStudentsPanel();
    }


    studentsBtnNav.addEventListener('click', async () => {
        await loadStudentsPanel();
    });

    disciplinasBtnNav.addEventListener('click', async () => {
        await loadSubjectsPanel();
    });

    professorsBtnNav.addEventListener('click', async () => {
        await loadTeachersPanel();
    });

    async function loadStudentsPanel(){
        tbody.innerHTML = ""
        studentsBtnNav.style.color = "#FEF08A"
        disciplinasBtnNav.style.color = "#FAFAFA"
        professorsBtnNav.style.color = "#FAFAFA"
        changeBtnHref('admFlowPages/studentRegister.html')
        changeThOfPage('Matrícula', 'Nome', 'Disciplinas', 'Ações')
        const allStudents = await getAllStudents()
        if(!allStudents.alunos){
            changeTitlePage("0", "Alunos")
            return console.log('Lista vazia')
        }
        changeTitlePage(allStudents.alunos.length, "Alunos")
        iterateArrays(allStudents.alunos, createStudentsTableRows)
    }
    
    async function loadSubjectsPanel(){
        tbody.innerHTML = ""
        studentsBtnNav.style.color = "#FAFAFA"
        disciplinasBtnNav.style.color = "#FEF08A"
        professorsBtnNav.style.color = "#FAFAFA"
        changeBtnHref('admFlowPages/disciplinaRegister.html')
        changeThOfPage('Nome', 'Professor', 'Quizz', 'Ações')
        const allSubjects = await getAllDisciplinasIfProfessorName()
        if(!allSubjects.disciplinas){
            changeTitlePage("0", "Disciplinas")
            return console.log('Lista vazia')
        }
        changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
        iterateArrays(allSubjects.disciplinas, createSubjectsTableRows)
    }
});

