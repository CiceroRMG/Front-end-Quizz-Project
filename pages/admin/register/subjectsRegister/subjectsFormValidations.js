export function inputEmptyValidation(value, inputTag, inputTagSpan){
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
    span.classList.add('animate-in-hover')
}

export function removeErrorValidation(inputTag, inputTagSpan){
    const input = document.querySelector(inputTag)
    const span = document.querySelector(inputTagSpan)

    input.classList.remove('fail')
    span.classList.add('hidden')
    span.classList.remove('animate-in-hover')
}

export function eventFocusInputs(){
    const inputName = document.querySelector('#inputName')
    inputName.addEventListener('focus', function() {
        removeErrorValidation('#inputName', '#inputNameError');
    });
    
    const inputYear = document.querySelector('#inputYear')
    inputYear.addEventListener('focus', function() {
        removeErrorValidation('#inputYear', '#inputYearError');
    });
}