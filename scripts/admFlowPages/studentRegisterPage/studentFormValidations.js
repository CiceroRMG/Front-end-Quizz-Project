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

const inputName = document.querySelector('#student-name')
inputName.addEventListener('focus', function() {
    removeErrorValidation('.name-form', '.student-name-span');
});

const inputEmail = document.querySelector('#email-input')
inputEmail.addEventListener('focus', function() {
    removeErrorValidation('.email-form', '.email-span');
});

const inputMatricula = document.querySelector('#matricula-input')
inputMatricula.addEventListener('focus', function() {
    removeErrorValidation('.matricula-form', '.matricula-span');
});