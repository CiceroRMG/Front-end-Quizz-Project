import { Toaster } from "../../../../components/toaster/toaster.js";
import { editDisciplina, getOnBackUserById, turnNullSubjectsProfId } from "../../../../scripts/fetchDbFunctions.js";
import { inputEmptyValidation, validateAllStudentsInputsAndEdit } from "../../register/studentsRegister/studentsFormValidations.js"

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao editar o professor.",
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

export async function formEditProfessors(){
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
            tipo: "professor"
        }
        const userId = takeIdByParams()
    
        const validations = await validateAllStudentsInputsAndEdit(req, userId)
        if(!validations){
            return console.log('Algum dado invalido')
        }        
        
        await turnNullSubjectsProfId(userId)
        let userRelation = ""
        if(selectedSubjectsValue.length > 0){
            for (const subjectSelect of selectedSubjectsValue){
                req2 = {
                    prof_id: userId,
                }
                userRelation = await editDisciplina(req2, subjectSelect)
            }
        
        } 
            
        if (validations.status === 200 || userRelation.status === 200){
            localStorage.setItem('successToaster', 'true')
            return window.location.href = `/pages/admin/painel/professorsPainel/professorsPainel.html`
        } else {
            return document.body.append(Toaster(errorToaster))
        }
    
    })

}
