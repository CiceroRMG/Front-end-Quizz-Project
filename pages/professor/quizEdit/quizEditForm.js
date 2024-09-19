import { Toaster } from "../../../components/toaster/toaster.js";
import { editQuiz, registerQuiz } from "../../../scripts/fetchDbFunctions.js";
import { takeIdByParams } from "../../../scripts/takeIdByParams.js";
import { inputEmptyValidation } from "../../admin/register/studentsRegister/studentsFormValidations.js"
import { nameQuizValidation, validateFinishDate, validateStartDate } from "../quizzRegister/quizRegisterValidations.js";

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

const missingToaster = {
    title: "Campo Obrigatório Faltando!",
    image: "/components/toaster/img/infoCircle.svg",
    subtitle: "Esta faltando algum dado obrigatório",
    style: "info"
}


let selectedSubjectValue = []
let quizTypeValue = []
let maxTimeValue = []

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

export async function formEventQuizEdit(){

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
        
        
        if(
            !nameQuizValidation(inputQuizName.value) ||
            !validateStartDate(inputStartDate.value) ||
            !validateFinishDate(inputFinishDate.value, inputStartDate.value)
        ) {
            action = "";
            return console.log('Algum dado invalido')
        }

        if(!selectedSubjectValue || !quizTypeValue || !maxTimeValue){
            return document.body.append(Toaster(missingToaster))
        }

        req = {
            titulo: inputQuizName.value,
            tempo: maxTimeValue ? maxTimeValue : null,
            tentativas: inputAttempts.value > "0" ? inputAttempts.value : "999",
            data_inicio: inputStartDate.value,
            data_fim: inputFinishDate.value,
            mensagem: textArea.value,
            tipo: quizTypeValue ? quizTypeValue : null,
            rascunho: true,
            disciplina_id: selectedSubjectValue
        }
        
        const registerQuizReq = await editQuiz(req, takeIdByParams())
        const quizz = registerQuizReq.data.updatedQuizz
        

        if(!registerQuizReq){
            action = ""
            return console.log('Algo deu errado na criação do quiz')
        }        
        
        if (registerQuizReq.status === 200){
            if(action === "register"){
                window.location.href = `/pages/professor/quizEdit/questionsEdit/questionsEdit.html?id=${quizz._id}`
            }
            if(action === "save"){
                localStorage.setItem('saveToaster', 'true')
                 window.location.href = `/pages/professor/subject/subject.html?id=${quizz.disciplina_id}`
            }
            
        } else {
            return document.body.append(Toaster(errorToaster))
        }
    
    })

}
