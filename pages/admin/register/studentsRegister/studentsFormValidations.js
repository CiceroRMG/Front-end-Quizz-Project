import { Toaster } from "../../../../components/toaster/toaster.js"
import { editDisciplina, editUserNoPassword, registerUser } from "../../../../scripts/fetchDbFunctions.js"

const existsToaster = {
    title: "Erro!",
    image: "/components/toaster/img/infoCircle.svg",
    subtitle: "Esse usuário já foi cadastrado.",
    style: "info"
}

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
}

export function removeErrorValidation(inputTag, inputTagSpan){
    const input = document.querySelector(inputTag)
    const span = document.querySelector(inputTagSpan)

    input.classList.remove('fail')
    span.classList.add('hidden')
}

export async function validateAllStudentsInputsAndRegister(req){
    const criandoAluno = await registerUser(req)
    // matricula ou email ja existem cadastrados
    if (criandoAluno.status === 409){
        document.body.append(Toaster(existsToaster))
        return false
    }
    // validação do nome
    if(criandoAluno.status === 400){
        errorValidations('#inputName', '#inputNameError')
        return false
    }
    // validação da matrícula
    if(criandoAluno.status === 406){
        errorValidations('#inputRegistration', '#inputRegistrationError')
        return false
    }
    // validação do email
    if(criandoAluno.status === 412){
        errorValidations('#inputEmail', '#inputEmailError')
        return false
    }
    return criandoAluno
}

export async function validateAllStudentsInputsAndEdit(req, id){
    const criandoAluno = await editUserNoPassword(req, id)
    // matricula ou email ja existem cadastrados
    if (criandoAluno.status === 409){
        document.body.append(Toaster(existsToaster))
        return false
    }
    // validação do nome
    if(criandoAluno.status === 400){
        errorValidations('#inputName', '#inputNameError')
        return false
    }
    // validação da matrícula
    if(criandoAluno.status === 406){
        errorValidations('#inputRegistration', '#inputRegistrationError')
        return false
    }
    // validação do email
    if(criandoAluno.status === 412){
        errorValidations('#inputEmail', '#inputEmailError')
        return false
    }
    return criandoAluno
}

export function eventFocusInputs(){
    
    const inputName = document.querySelector('#inputName')
    inputName.addEventListener('focus', function() {
        removeErrorValidation('#inputName', '#inputNameError');
    });
    
    const inputEmail = document.querySelector('#inputEmail')
    inputEmail.addEventListener('focus', function() {
        removeErrorValidation('#inputEmail', '#inputEmailError');
    });
    
    const inputMatricula = document.querySelector('#inputRegistration')
    inputMatricula.addEventListener('focus', function() {
        removeErrorValidation('#inputRegistration', '#inputRegistrationError');
    });
}