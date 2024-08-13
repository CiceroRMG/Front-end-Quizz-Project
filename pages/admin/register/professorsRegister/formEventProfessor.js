import { Toaster } from "../../../../components/toaster/toaster.js";
import { editDisciplina, registerUserDisciplina } from "../../../../scripts/fetchDbFunctions.js";
import { inputEmptyValidation, validateAllStudentsInputsAndRegister } from "../studentsRegister/studentsFormValidations.js"

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso no cadastro do professor.",
}

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao cadastrar o professor.",
    style: "error"
}


let selectedSubjectsValue = ""

document.addEventListener('selectDisciplinas', (event) => {
    selectedSubjectsValue = event.detail.values;
    
});


export async function formEventProfessors(){

    const form = document.querySelector(".register-form")
        
    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        let req = {}
        let req2 = {}
    
        const inputStudentName = document.querySelector('#inputName')
        const inputRegister = document.querySelector('#inputRegistration')
        const inputEmail = document.querySelector('#inputEmail')
        
        // validações dos formulários
        if(
            !inputEmptyValidation(inputStudentName.value, '#inputName', '#inputNameError') ||
            !inputEmptyValidation(inputRegister.value, '#inputRegistration', '#inputRegistrationError') || 
            !inputEmptyValidation(inputEmail.value, '#inputEmail', '#inputEmailError')
        ) {
            return console.log('Algum dado invalido')
        }

        req = {
            nome: inputStudentName.value,
            matricula: inputRegister.value,
            email: inputEmail.value,
            senha: "12345",
            tipo: "professor"
        }
    
        const validations = await validateAllStudentsInputsAndRegister(req)
        if(!validations){
            return console.log('Algum dado invalido')
        }        
    
        let userRelation = ""
        if(selectedSubjectsValue.length > 0){
            const userId = validations.user._id
            for (const subjectSelect of selectedSubjectsValue){
                req2 = {
                    prof_id: userId,
                }
                userRelation = await editDisciplina(req2, subjectSelect)
            }
        
        } 
            
        if (validations.status === 201 || userRelation.status === 200){
            return document.body.append(Toaster(successToaster))
            
        } else {
            return document.body.append(Toaster(errorToaster))
        }
    
    })

}
