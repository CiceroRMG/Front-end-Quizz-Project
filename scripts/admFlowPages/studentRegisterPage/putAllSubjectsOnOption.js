export async function putAllSubjectsOnOption(array){
    for (const subject of array){
        createAllSubjectOption(subject)
    }

}

export function createAllSubjectOption(objeto){
    const select = document.querySelector('.select')
    
    const option = document.createElement('li')

    option.innerHTML = `${objeto.nome} - ${objeto.ano} / ${objeto.semestre}`
    option.classList.add('option')
    option.setAttribute('data-value', `${objeto._id}`)

    option.addEventListener('click', ()=>{
        const input = document.querySelector('#subject-select')
        input.value = option.textContent
    })

    select.append(option)
}