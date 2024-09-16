export function inputEmptyValidation(value, inputTag, inputTagSpan){
    if(!value){
        errorValidations(inputTag, inputTagSpan)
        return false
    } 
    return true
}

export function errorValidations(inputTag, inputTagSpan, msg = null){
    const input = document.querySelector(inputTag)
    const span = document.querySelector(inputTagSpan)

    input.classList.add('fail')
    span.classList.remove('hidden')
    span.classList.add('animate-in-hover')

    if(msg){
        span.innerText = msg
    }
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

export function yearValidate(value){
    const currentYear = getCurrentYear()
    const valueNumber = Number(value)

    if(!value){
        const msg = `O campo "Ano" não pode ser vazio.`
        errorValidations('#inputYear', '#inputYearError', msg)
        return false
    }

    if(valueNumber < currentYear){
        const msg = "O ano não pode ser menor que o atual."
        errorValidations('#inputYear', '#inputYearError', msg)
        return false
    }

    if(isNaN(valueNumber)){
        const msg = "O ano não pode conter letras.";
        errorValidations('#inputYear', '#inputYearError', msg);
        return false;
    }

    if(value.length != 4){
        const msg = "O ano deve conter somente 4 dígitos."
        errorValidations('#inputYear', '#inputYearError', msg)
        return false
    }


    return true
}

export function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
}

export function nameValidations(value){

    if(!value){
        const msg = `O campo "Nome" deve estar preenchido.`
        errorValidations('#inputName', '#inputNameError', msg)
        return false
    }

    if(value.length > 50 || value.length < 4){
        const msg = "O nome deve possuir de 4 a 50 caractéres."
        errorValidations('#inputName', '#inputNameError', msg)
        return false
    }

    return true
}