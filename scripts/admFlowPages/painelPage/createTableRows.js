import { deleteDisciplinaById } from "../../fetchDbFunctions.js"
import { getAllDisciplinasIfProfessorName } from "../../fetchDbFunctions.js";
import { changeTitlePage } from "./changeTitleOfPage.js";
import { dialogDeleteBtn } from "./deleteDialog.js";
import { changeDialogMessageBtnDelete } from "./deleteDialog.js";
import { createDialog } from "./createDialogDelete.js";
import { based_url } from "../../config.js";
import { noRegister, register } from "./noRegisterOnTable.js";

// mensagem do dialog-delete da table das disciplinas
const subjectTitleDialog = "Tem certeza que quer deletar essa disciplina?"
const subjectMessageDialog = `Ao deletar a disciplina, todos os dados serão perdidos, 
                            incluindo os quizzes e os alunos vinculados`


// tanto a função de criar as tables estão inclusas aqui, quanto a do fluxo de delete do botao e o dialog
export async function createSubjectsTableRows(objeto){
    noRegister()
    const tr = document.createElement('tr')

    tr.id = `disciplina-${objeto._id}`;
    const profName = objeto.prof_id
    if (profName){
        tr.innerHTML = 
        `
            <td class="first">${objeto.nome} - ${objeto.ano}</td>
            <td class="second">${objeto.prof_id.nome}</td>
            <td class="third">
                <p>${objeto.quizes.length}</p>
                <div class="hover-quizz hidden">
                    <ul class="hover-quizz-ul">
                    </ul>
                </div>
            </td>
            <td class="last">
                <div class="links">
                    <a class="first-a" href="${based_url}/html/admFlowPages/disciplinaEdit.html?id=${objeto._id}">Editar</a>
                </div>
            </td>
                    
        `
    } else {
        tr.innerHTML = 
        `
            <td class="first">${objeto.nome} - ${objeto.ano}</td>
            <td class="second" style="color: #78716C">Não possui professor</td>
            <td class="third">
                <p>${objeto.quizes.length}</p>
                <div class="hover-quizz hidden">
                    <ul class="hover-quizz-ul">
                    </ul>
                </div>
            </td>
            <td class="last">
                <div class="links">
                    <a class="first-a" href="${based_url}/html/admFlowPages/disciplinaEdit.html?id=${objeto._id}">Editar</a>
                </div>
            </td>
                    
        `
    }

    // parte do hover na quatidade de quizzes
    const third = tr.querySelector('.third')
    const hoverUl = tr.querySelector('.hover-quizz-ul')
    const hoverDiv = tr.querySelector('.hover-quizz')
    for (const quizz of objeto.quizes){
        const nome = quizz.nome
        const li = document.createElement('li')
        li.innerText = nome
        hoverUl.append(li)
    }
    if(objeto.quizes.length === 0){
        const li = document.createElement('li')
        li.innerText = "Não possui Quizzes"
        hoverUl.append(li)
    }

    third.addEventListener('mouseenter', ()=>{
        hoverDiv.classList.remove('hidden')
        hoverDiv.classList.add('animate-in-hover')
    })
    third.addEventListener('mouseleave', ()=>{
        hoverDiv.classList.add('hidden')
    })


    const deleteBtn = document.createElement('a')
    deleteBtn.innerText = 'Remover'
    deleteBtn.href = '#';

    const linksDiv = tr.querySelector('.links');
    linksDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', async ()=>{
        const dialog = createDialog()
        dialogDeleteBtn(dialog)
        changeDialogMessageBtnDelete(dialog, subjectTitleDialog, subjectMessageDialog, objeto.nome)

        const deleteBtnConfirm = dialog.querySelector('.deleteBtnConfirm')
        deleteBtnConfirm.addEventListener('click', async ()=>{
            await deleteDisciplinaById(objeto._id)
            const element = document.getElementById(`disciplina-${objeto._id}`) 
            element.classList.add('elemento-excluido')
            setTimeout(()=>element.remove(), 500)
            subtractOneOfRegisterSubjectsNumber()
        })
    })

    const tbody = document.querySelector('.tbody')
    tbody.append(tr)
}


// faz denovo a contagem de elementos da array toda vez que exclui uma disciplina
async function subtractOneOfRegisterSubjectsNumber(){
    const allSubjects = await getAllDisciplinasIfProfessorName()
    if(!allSubjects.disciplinas){
        changeTitlePage("0", "Disciplinas")
        register()
    }
    changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
}

