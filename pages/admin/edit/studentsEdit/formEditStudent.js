import { Toaster } from "../../../../components/toaster/toaster.js";
import { deleteAllSubjectStudentRelation, getOnBackDisciplinasUsersTable, getOnBackUserById, registerUserDisciplina } from "../../../../scripts/fetchDbFunctions.js";
import { inputEmptyValidation, validateAllStudentsInputsAndEdit } from "../../register/studentsRegister/studentsFormValidations.js"

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso na edição do aluno.",
}

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao editar o aluno.",
    style: "error"
}


export function takeIdByParams(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    return id
}

export async function displayValuesOnInputs(){
    const inputUserName = document.querySelector('#inputName')
    const inputRegister = document.querySelector('#inputRegistration')
    const inputEmail = document.querySelector('#inputEmail')

    const takeUserById = await getOnBackUserById(takeIdByParams())
    

    inputUserName.value = takeUserById.usuario.nome
    inputRegister.value = takeUserById.usuario.matricula
    inputEmail.value = takeUserById.usuario.email
    
}

let selectedSubjectsValue = []

document.addEventListener('selectDisciplinas', (event) => {
    selectedSubjectsValue = event.detail.values;
    
});

export async function formEditStudent(){
    await displayValuesOnInputs()

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
            tipo: "aluno"
        }
        const userId = takeIdByParams()
    
        const validations = await validateAllStudentsInputsAndEdit(req, userId)
        if(!validations){
            return console.log('Algum dado invalido')
        }        
    
        let userRelation = ""
        if(selectedSubjectsValue.length > 0){

            const deleteAllRelations = await deleteAllSubjectStudentRelation(userId)
            if(deleteAllRelations.status === 200){

                for (const subjectSelect of selectedSubjectsValue){
                    req2 = {
                        aluno_id: userId,
                        disciplina_id: subjectSelect
                    }
                    userRelation = await registerUserDisciplina(req2)
                }

            }
        
        } 
            
        if (validations.status === 200 || userRelation.status === 201){
            return document.body.append(Toaster(successToaster))
            
        } else {
            return document.body.append(Toaster(errorToaster))
        }
    
    })

}
