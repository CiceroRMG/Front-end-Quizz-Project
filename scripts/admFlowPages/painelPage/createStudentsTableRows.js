import { deleteUserById, getOnBackDisciplinasUsersTable } from "../../fetchDbFunctions.js"
import { getAllStudents } from "../../fetchDbFunctions.js";
import { changeTitlePage } from "./changeTitleOfPage.js";
import { dialogDeleteBtn } from "./deleteDialog.js";
import { changeDialogMessageBtnDelete } from "./deleteDialog.js";
import { createDialog } from "./createDialogDelete.js";
import { based_url } from "../../config.js";
import { register, noRegister } from "./noRegisterOnTable.js";

// mensagem do dialog-delete da table das disciplinas
const subjectTitleDialog = "Tem certeza que quer deletar esse aluno?"
const subjectMessageDialog = `Ao deletar este Aluno, todos os seus dados serão perdidos.`


// tanto a função de criar as tables estão inclusas aqui, quanto a do fluxo de delete do botao e o dialog
export async function createStudentsTableRows(objeto){
    noRegister()
    const tr = document.createElement('tr')

    tr.id = `aluno-${objeto._id}`;

    const studentSubject = await getOnBackDisciplinasUsersTable(objeto._id)
    
    tr.innerHTML = 
    `
        <td class="first">${objeto.matricula}</td>
        <td class="second">${objeto.nome}</td>
        <td class="third">
            <p>${studentSubject.disciplinasComAlunos.length}</p>
            <div class="hover-quizz hidden">
                <ul class="hover-quizz-ul">
                </ul>
            </div>
        </td>
        <td class="last">
            <div class="links">
                <a class="first-a" href="${based_url}/html/admFlowPages/studentsEdit.html?id=${objeto._id}">Editar</a>
            </div>
        </td>
                
    `


    // parte do hover na quatidade de quizzes
    const third = tr.querySelector('.third')
    const hoverUl = tr.querySelector('.hover-quizz-ul')
    const hoverDiv = tr.querySelector('.hover-quizz')
    for (const subject of studentSubject.disciplinasComAlunos){
        const nome = subject.disciplina_id.nome
        const li = document.createElement('li')
        li.innerText = nome
        hoverUl.append(li)
    }
    if(studentSubject.disciplinasComAlunos.length === 0){
        const li = document.createElement('li')
        li.innerText = "Não possui Disciplinas"
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
            await deleteUserById(objeto._id)
            const element = document.getElementById(`aluno-${objeto._id}`) 
            element.classList.add('elemento-excluido')
            setTimeout(()=>element.remove(), 500)
            subtractOneOfStudentsNumber()
        })
    })

    const tbody = document.querySelector('.tbody')
    tbody.append(tr)
}



// faz denovo a contagem de elementos da array toda vez que exclui um elemento
async function subtractOneOfStudentsNumber(){
    const allStudents = await getAllStudents();
    if(!allStudents.alunos){
        changeTitlePage("0", "Alunos")
        register()
    }
    changeTitlePage(allStudents.alunos.length, "Alunos")
}

