import { Toaster } from "../../../../components/toaster/toaster.js";
import { registerQuizQuestions } from "../../../../scripts/fetchDbFunctions.js";
import { takeIdByParams } from "./index.js";

const successToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Sucesso no cadastro das perguntas.",
}

const rascunhoToaster = {
    title: "Sucesso!",
    image: "/components/toaster/img/checkCircle.svg",
    subtitle: "Seu quiz foi guardado no rascunho",
}

const rascunhoErrorToaster = {
    title: "Todos Campos Vazios!",
    image: "/components/toaster/img/infoCircle.svg",
    subtitle: "Para guardar no rascunho, ao menos uma pergunta deve estar completa",
    style: "info"
}

const errorToaster = {
    title: "Erro!",
    image: "/components/toaster/img/errorCircle.svg",
    subtitle: "Ocorreu algum erro ao cadastrar o quiz.",
    style: "error"
}

const missingToaster = {
    title: "Campo Vazio!",
    image: "/components/toaster/img/infoCircle.svg",
    subtitle: "Para finalizar, todos os campos devem ser preenchidos",
    style: "info"
}


let action = ""

let perguntasArray = []

export async function formEventQuestions(){

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
        
        for(let num = 1; num <= 10; num++){
            takeInputsValueAndCreateObjectQuestion(`#pergunta${num}`)
        }

        if(action === "register"){
            
            if(perguntasArray.length !== 10){
                return document.body.append(Toaster(missingToaster))
            }
            req = {
                perguntas: perguntasArray,
                rascunho: false
            }
        }
        if(action === "save"){
            if(perguntasArray.length < 1){
                return document.body.append(Toaster(rascunhoErrorToaster))
            }
            req = {
                perguntas: perguntasArray,
                rascunho: true
            }
        }

        console.log(req);
        
        const id = takeIdByParams()
        const registerQuestionsOnQuizz = await registerQuizQuestions(req, id)
        

        if(!registerQuestionsOnQuizz){
            action = ""
            return console.log('Algo deu errado na criação das perguntas')
        }        
        console.log(action);
        
        if (registerQuestionsOnQuizz.status === 200){
            if(action === "save"){
                return document.body.append(Toaster(rascunhoToaster))
            }
            return document.body.append(Toaster(successToaster))
            
        } else {
            return document.body.append(Toaster(errorToaster))
        }

    })
    

}


function takeInputsValueAndCreateObjectQuestion(id){

    let alernativasArray = []

    const question = document.querySelector(id)

    const corretaInput = question.querySelector('.correctInput')
    if(!corretaInput.value){
        return false
    }  
    const corretaObject = {
        conteudo: corretaInput.value,
        correta: true
    }
    alernativasArray.push(corretaObject)

    for(let num = 1; num <=3; num++){
        const incorretoInput = question.querySelector(`.incorrectInput${num}`)
        if(!incorretoInput.value){
            return false
        }
        const incorretaObject = {
            conteudo: incorretoInput.value,
            correta: false
        }
        alernativasArray.push(incorretaObject)
    }

    const pergunta = question.querySelector('#inputHead')
    if(!pergunta.value){
        return false
    }

    const reqObject = {
        titulo: pergunta.value,
        alternativas: alernativasArray
    }

    perguntasArray.push(reqObject)
}