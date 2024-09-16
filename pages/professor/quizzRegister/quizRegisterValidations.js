import { errorValidations, removeErrorValidation } from "../../admin/register/subjectsRegister/subjectsFormValidations.js";


export function eventFocusInputs(){
    
    const inputName = document.querySelector('#inputName')
    inputName.addEventListener('focus', function() {
        removeErrorValidation('#inputName', '#inputNameError');
    });
    
    const inputStartDate = document.querySelector('#inputStartDate')
    inputStartDate.addEventListener('focus', function() {
        removeErrorValidation('#inputStartDate', '#inputStartDateError');
    });

    const inputFinishDate = document.querySelector('#inputStartDate')
    inputFinishDate.addEventListener('focus', function() {
        removeErrorValidation('#inputFinishDate', '#inputFinishDateError');
    });
}

export function nameQuizValidation(value){

    if(!value){
        const msg = `O campo "Nome" deve estar preenchido.`
        errorValidations('#inputName', '#inputNameError', msg)
        return false
    }

    if(value.length > 50 || value.length < 4){
        const msg = "O nome do quiz deve possuir de 4 a 50 caractéres."
        errorValidations('#inputName', '#inputNameError', msg)
        return false
    }

    return true
}

export function validateStartDate(value){

    if(!value){
        const msg = `O campo "Data de início" deve estar preenchido.`
        errorValidations('#inputStartDate', '#inputStartDateError', msg)
        return false
    }

    const currentDate = new Date();
    const inputDate = new Date(Date.parse(value + 'T00:00:00'));
    
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    if (inputDate.getTime() < currentDate.getTime()) {
        const msg = "A data de início não pode ser menor que a data atual.";
        errorValidations('#inputStartDate', '#inputStartDateError', msg);
        return false;
    }

    return true
}

export function validateFinishDate(value, startDate){

    if(!value){
        const msg = `O campo "Data de entrega" deve estar preenchido.`
        errorValidations('#inputFinishDate', '#inputFinishDateError', msg)
        return false
    }

    const inputDate = new Date(Date.parse(value + 'T00:00:00'));
    const startDateInput = new Date(Date.parse(startDate + 'T00:00:00'));

    inputDate.setHours(0, 0, 0, 0);
    startDateInput.setHours(0, 0, 0, );

    if (inputDate < startDateInput) {
        const msg = "A data de entrega não pode ser menor que a data de início.";
        errorValidations('#inputFinishDate', '#inputFinishDateError', msg);
        return false;
    }

    return true
}