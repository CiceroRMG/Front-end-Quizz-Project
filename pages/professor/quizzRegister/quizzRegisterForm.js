import { Toaster } from "../../../components/toaster/toaster.js";
import { registerQuiz } from "../../../scripts/fetchDbFunctions.js";
import { inputEmptyValidation } from "../../admin/register/studentsRegister/studentsFormValidations.js"

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso no cadastro do Quiz.",
}

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao cadastrar o quiz.",
    style: "error"
}


let selectedSubjectValue = ""
let quizTypeValue = ""
let maxTimeValue = ""

document.addEventListener('selectDisciplinas', (event) => {
    selectedSubjectValue = event.detail.values[0];
    
});

document.addEventListener('selectQuizType', (event) => {
    quizTypeValue = event.detail.values[0];
    
});

document.addEventListener('selectTime', (event) => {
    maxTimeValue = event.detail.values[0];
    
});

let action = ""

export async function formEventQuiz(){

    const form = document.querySelector(".register-form")

    const createBtn = document.getElementById('registerBtn')
    createBtn.addEventListener('click', ()=>{
        action = 'register';
    })

    const saveBtnValue = document.getElementById('saveBtn')
    saveBtnValue.addEventListener('click', ()=>{
        action = 'save';
    })

    form.addEventListener('submit', async (event)=>{
        event.preventDefault()

        let req = {}
    
        const inputQuizName = document.querySelector('#inputName')
        const inputAttempts = document.querySelector('#inputAttempts')
        const inputStartDate = document.querySelector('#inputStartDate')
        const inputFinishDate = document.querySelector('#inputFinishDate')
        const textArea = document.querySelector('.longText-area')
        
        // validações dos formulários
        if(
            !inputEmptyValidation(inputQuizName.value, '#inputName', '#inputNameError')
        ) {
            action = "";
            return console.log('Algum dado invalido')
        }

        req = {
            titulo: inputQuizName.value,
            tempo: maxTimeValue ? maxTimeValue : null,
            tentativas: inputAttempts.value > 0 ? inputAttempts.value : 999,
            data_inicio: inputStartDate.value,
            data_fim: inputFinishDate.value,
            mensagem: textArea.value,
            tipo: quizTypeValue ? quizTypeValue : null,
            rascunho: true,
            disciplina_id: selectedSubjectValue ? selectedSubjectValue : null,
        }
    
        const registerQuizReq = await registerQuiz(req)

        if(!registerQuizReq){
            action = ""
            return console.log('Algo deu errado na criação do quiz')
        }        
        console.log(action);
        
        if (registerQuizReq.status === 201){
            if(action === "register"){
                window.location.href = "/pages/professor/quizzRegister/quizzRegisterQuestions.html"
            }
            if(action === "save"){
                history.back()
            }
            
        } else {
            return document.body.append(Toaster(errorToaster))
        }
    
    })

}
