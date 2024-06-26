import { deleteDisciplinaById } from "../../fetchDbFunctions.js"

export async function createTableRows(objeto){
    const tr = document.createElement('tr')
    const deleteBtn = document.createElement('a')

    tr.id = `disciplina-${objeto._id}`;
    // cria a função de deletar a disciplina no botão
    deleteBtn.innerText = 'Remover'
    deleteBtn.addEventListener('click', async ()=>{
        await deleteDisciplinaById(objeto._id)
        document.getElementById(`disciplina-${objeto._id}`).remove();
    })

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
                    <a class="first-a">Editar</a>
                </div>
            </td>
                    
        `
    }

    const linksDiv = tr.querySelector('.links');
    linksDiv.appendChild(deleteBtn);

    const tbody = document.querySelector('.tbody')
    tbody.append(tr)
}

export function displayNameAndProfessor(allSubjects){
    for (const subject of allSubjects){
        createTableRows(subject)
    }
}