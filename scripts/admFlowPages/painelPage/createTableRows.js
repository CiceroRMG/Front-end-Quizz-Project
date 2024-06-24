export function createTableRows(objeto){
    const tr = document.createElement('tr')
    const profName = objeto.prof_id
    if (profName){
        tr.innerHTML = 
        `
            <td class="first">${objeto.nome} - ${objeto.ano}</td>
            <td class="second">${objeto.prof_id.nome}</td>
            <td class="third">${objeto.quizes.length}</td>
            <td class="last">
                <div class="links">
                    <a class="first-a" href="#">Editar</a><a href="#">Remover</a>
                </div>
            </td>
                    
        `
    } else {
        tr.innerHTML = 
        `
            <td class="first">${objeto.nome} - ${objeto.ano}</td>
            <td class="second">Não possui professor</td>
            <td class="third">${objeto.quizes.length}</td>
            <td class="last">
                <div class="links">
                    <a class="first-a" href="#">Editar</a><a href="#">Remover</a>
                </div>
            </td>
                    
        `
    }
    const tbody = document.querySelector('.tbody')
    tbody.append(tr)
}

export function displayNameAndProfessor(allSubjects){
    for (const subject of allSubjects){
        createTableRows(subject)
    }
}