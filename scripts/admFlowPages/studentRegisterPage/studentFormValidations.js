import { displayExistsModal } from "../alreadyExistsModal.js"
import { registerUser } from "../../fetchDbFunctions.js"

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

export async function validateAllInputs(req){
    const criandoAluno = await registerUser(req)
    // matricula ou email ja existem cadastrados
    if (criandoAluno.status === 409){
        displayExistsModal(criandoAluno.info)
        return false
    }
    // validação do nome
    if(criandoAluno.status === 400){
        errorValidations('.name-form', '.student-name-span')
        return false
    }
    // validação da matrícula
    if(criandoAluno.status === 406){
        errorValidations('.matricula-form', '.matricula-span')
        return false
    }
    // validação do email
    if(criandoAluno.status === 412){
        errorValidations('.email-form', '.email-span')
        return false
    }
    return criandoAluno
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