import { Toaster } from "../../../components/toaster/toaster.js";
import { registerQuiz } from "../../../scripts/fetchDbFunctions.js";
import { nameQuizValidation, validateFinishDate, validateStartDate } from "./quizRegisterValidations.js";

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

let loader = document.querySelector('.div-load-req');

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
        loader.style.display = 'flex';

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
            loader.style.display = 'none';
            return console.log('Algum dado invalido')
        }

        if(!selectedSubjectValue || !quizTypeValue || !maxTimeValue){
            loader.style.display = 'none';
            return document.body.append(Toaster(missingToaster))
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
        const quizzId = registerQuizReq.data.response._id
        
        if(!registerQuizReq){
            action = ""
            loader.style.display = 'none';
            return console.log('Algo deu errado na criação do quiz')
        }        

        
        if (registerQuizReq.status === 201){
            if(action === "register"){
                window.location.href = `/pages/professor/quizzRegister/questionsRegister/questionsRegister.html?id=${quizzId}`
                loader.style.display = 'none';
                return
            }
            if(action === "save"){
                localStorage.setItem('saveToaster', 'true')
                window.location.href = `/pages/professor/subject/subject.html?id=${registerQuizReq.data.response.disciplina_id}`
                loader.style.display = 'none';
                return
            }
        } else {
            loader.style.display = 'none';
            return document.body.append(Toaster(errorToaster))
        }
    
    })

}
