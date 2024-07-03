export async function putAllSubjectsOnOption(array){
    for (const subject of array){
        createAllSubjectOption(subject)
    }

}

let selectedOptions = {
    names: [],
    values: []
};

export function createAllSubjectOption(objeto){
    const select = document.querySelector('.select')
    
    const option = document.createElement('li')

    option.innerHTML = `${objeto.nome} - ${objeto.ano} / ${objeto.semestre}`
    option.classList.add('option')
    option.setAttribute('data-value', `${objeto._id}`)
    option.setAttribute('data-name', `${objeto.nome}`)

    function selectOptionsAndReturnValueArray(){
        const input = document.querySelector('#subject-select')
        const valueName = option.getAttribute('data-name')
        const value = option.getAttribute('data-value')

        if (selectedOptions.names.includes(valueName)){
            option.classList.remove('ok')
            selectedOptions.names = selectedOptions.names.filter(val => val !== valueName);
        } else {
            selectedOptions.names.push(valueName)
            option.classList.add('ok')
        }

        input.value = selectedOptions.names.join(', ')

        if (selectedOptions.values.includes(value)){
            selectedOptions.values = selectedOptions.values.filter(val => val !== value);
        } else {
            selectedOptions.values.push(value)
        }
        
        return selectedOptions.values
    }

    option.addEventListener('click', selectOptionsAndReturnValueArray)

    select.append(option)
}

export { selectedOptions };