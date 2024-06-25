export function putAllProfessorOnOption(array){
    for (const professor of array){
        createAllProfessorOption(professor)
    }

}

export function createAllProfessorOption(objeto){
    const select = document.getElementById('professor-select')
    
    const option = document.createElement('option')

    option.innerHTML = `${objeto.nome}`
    option.setAttribute('value', `${objeto._id}`)

    select.append(option)
}