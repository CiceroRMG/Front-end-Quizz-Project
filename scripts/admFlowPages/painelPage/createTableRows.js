import { deleteDisciplinaById } from "../../fetchDbFunctions.js"
import { getAllDisciplinasIfProfessorName } from "../../fetchDbFunctions.js";
import { changeTitlePage } from "./changeTitleOfPage.js";

export async function createTableRows(objeto){
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
        await deleteDisciplinaById(objeto._id)
        document.getElementById(`disciplina-${objeto._id}`).remove();
        subtractOneOfRegisterSubjectsNumber()
    })

    const tbody = document.querySelector('.tbody')
    tbody.append(tr)
}

export function displayNameAndProfessor(allSubjects){
    for (const subject of allSubjects){
        createTableRows(subject)
    }
}

// faz denovo a contagem de elementos da array toda vez que exclui uma disciplina
async function subtractOneOfRegisterSubjectsNumber(){
    const allSubjects = await getAllDisciplinasIfProfessorName()
    changeTitlePage(allSubjects.disciplinas.length, "Disciplinas")
}