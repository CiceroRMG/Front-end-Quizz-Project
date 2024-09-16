import { Toaster } from "../../../../components/toaster/toaster.js";
import { registerUserDisciplina } from "../../../../scripts/fetchDbFunctions.js";
import { inputEmptyValidation, validateAllStudentsInputsAndRegister } from "./studentsFormValidations.js"

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso no cadastro do aluno.",
}

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao cadastrar o aluno.",
    style: "error"
}


let selectedSubjectsValue = ""

document.addEventListener('selectDisciplinas', (event) => {
    selectedSubjectsValue = event.detail.values;
});


export async function formEventStudents(){

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

        // validando se tem professor ou não
        req = {
            nome: inputStudentName.value,
            matricula: inputRegister.value,
            email: inputEmail.value,
            senha: "12345",
            tipo: "aluno"
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
                    aluno_id: userId,
                    disciplina_id: subjectSelect
                }
                userRelation = await registerUserDisciplina(req2)
            }
        
        } 
            
        if (validations.status === 201 || userRelation.status === 201){
            return document.body.append(Toaster(successToaster))
            
        } else {
            return document.body.append(Toaster(errorToaster))
        }
    
    })

}
