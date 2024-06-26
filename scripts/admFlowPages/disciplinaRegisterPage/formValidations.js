export function inputValidation(value, inputTag, inputTagSpan){
    if(!value){
        errorValidations(inputTag, inputTagSpan)
        return false
    } 
    return true
}

export function errorValidations(inputTag, inputTagSpan){
    const input = document.querySelector(inputTag)
    const span = document.querySelector(inputTagSpan)

    input.classList.add('fail')
    span.classList.remove('hidden')
}

export function removeErrorValidation(inputTag, inputTagSpan){
    const input = document.querySelector(inputTag)
    const span = document.querySelector(inputTagSpan)

    input.classList.remove('fail')
    span.classList.add('hidden')
}

const inputName = document.querySelector('#subject-name')
inputName.addEventListener('focus', function() {
    removeErrorValidation('.name-form', '.subject-name-span');
});

const inputYear = document.querySelector('#data-select')
inputYear.addEventListener('focus', function() {
    removeErrorValidation('.data-form', '.data-select-span');
});

const inputSemestre = document.querySelector('#semestre-select')
inputSemestre.addEventListener('focus', function() {
    removeErrorValidation('.semestre-form', '.semestre-select-span');
});