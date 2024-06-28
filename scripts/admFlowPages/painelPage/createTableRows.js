import { deleteDisciplinaById } from "../../fetchDbFunctions.js"
import { getAllDisciplinasIfProfessorName } from "../../fetchDbFunctions.js";
import { changeTitlePage } from "./changeTitleOfPage.js";
import { dialogDeleteBtn } from "./deleteDialog.js";
import { changeDialogMessageBtnDelete } from "./deleteDialog.js";
import { createDialog } from "./createDialogDelete.js";

// mensagem do dialog-delete da table das disciplinas
const subjectTitleDialog = "Tem certeza que quer deletar essa disciplina?"
const subjectMessageDialog = `Ao deletar a disciplina, todos os dados serão perdidos, 
                            incluindo os quizzes e os alunos vinculados`


// tanto a função de criar as tables estão inclusas aqui, quanto a do fluxo de delete do botao e o dialog
export async function createTableRows(objeto){
    noRegisterSubjects()
    const tr = document.createElement('tr')

    tr.id = `disciplina-${objeto._id}`;

    const profName = objeto.prof_id
    if (profName){
        tr.innerHTML = 
        `
            <td class="first">${objeto.nome} - ${objeto.ano}</td>
            <td class="second">${objeto.prof_id.nome}</td>
            <td class="third">${objeto.quizes.length}</td>
            <td class="last">
                <div class="links">
                    <a class="first-a" href="#">Editar</a>
                </div>
            </td>
                    
        `
    } else {
        tr.innerHTML = 
        `
            <td class="first">${objeto.nome} - ${objeto.ano}</td>
            <td class="second" style="color: #78716C">Não possui professor</td>
            <td class="third">${objeto.quizes.length}</td>
            <td class="last">
                <div class="links">
                    <a class="first-a" href="#">Editar</a>
                </div>
            </td>
                    
        `
    }

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




// função pega a array de todas as disciplinas e percorre
export function displayNameAndProfessor(allSubjects){
    for (const subject of allSubjects){
        createTableRows(subject)
    }
}



// faz denovo a contagem de elementos da array toda vez que exclui uma disciplina
async function subtractOneOfRegisterSubjectsNumber(){
    const allSubjects = await getAllDisciplinasIfProfessorName()
    if(!allSubjects.disciplinas){
        changeTitlePage("0", "Disciplinas")
        registerSubjects()
    }
    changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
}


// mostra a div que fala que não possui disciplinas
function noRegisterSubjects(){
    const div = document.querySelector('.empty-subjects')
    div.classList.add('hidden')
    div.classList.remove('animate-in')
}

function registerSubjects(){
    const div = document.querySelector('.empty-subjects')
    div.classList.remove('hidden')
    div.classList.add('animate-in')
}
