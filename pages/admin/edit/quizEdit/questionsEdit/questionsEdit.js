import { Toaster } from "../../../../../components/toaster/toaster.js";
import { getOnBackQuizzesById, registerQuizQuestions } from "../../../../../scripts/fetchDbFunctions.js";
import { shuffleArray } from "../../../../../scripts/shuffleArray.js";
import { takeIdByParams } from "../../../../../scripts/takeIdByParams.js";



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

export async function formEventQuestionsEdit(){

    const quizQuestionsReq = await getOnBackQuizzesById(takeIdByParams())
    if(!quizQuestionsReq){
        return console.log("Erro na requisição de quiz por ID");
    }

    for(let num = 1; num <= 10; num++){
        putInputsValue(`#pergunta${num}`, num)
    }

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

        perguntasArray = []
        
        for(let num = 1; num <= 10; num++){
            takeInputsValueAndCreateObjectQuestion(`#pergunta${num}`)
        }

        for(let i = 0; i < perguntasArray.length; i++){
            console.log(perguntasArray[i].alternativas);
            perguntasArray[i].alternativas = shuffleArray(perguntasArray[i].alternativas);
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
        
        const id = takeIdByParams()
        const registerQuestionsOnQuizz = await registerQuizQuestions(req, id)
        

        if(!registerQuestionsOnQuizz){
            action = ""
            return console.log('Algo deu errado na criação das perguntas')
        }        
        
        if (registerQuestionsOnQuizz.status === 200){
            const disciplinaOfQuiz = await getOnBackQuizzesById(takeIdByParams())
            if(action === "save"){
                localStorage.setItem("saveToaster", "true")
                return window.location.href = `/pages/admin/edit/subjectsEdit/subjectsEdit.html?id=${disciplinaOfQuiz.quizz.disciplina_id._id}`
            }
            localStorage.setItem("registerToaster", "true")
            return window.location.href = `/pages/admin/edit/subjectsEdit/subjectsEdit.html?id=${disciplinaOfQuiz.quizz.disciplina_id._id}`
            
        } else {
            return document.body.append(Toaster(errorToaster))
        }

    })
    

}


function takeInputsValueAndCreateObjectQuestion(id){

    let alernativasArray = []

    const question = document.querySelector(id)

    const pergunta = question.querySelector('#inputHead')
    if(!pergunta.value){
        pergunta.style.outline = "1px solid #6366F1"
        pergunta.addEventListener('focus', removeOutlines);
        return false
    }

    const corretaInput = question.querySelector('.correctInput')
    if(!corretaInput.value){
        corretaInput.style.outline = "1px solid #6366F1"
        corretaInput.addEventListener('focus', removeOutlines);
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
            incorretoInput.style.outline = "1px solid #6366F1"
            incorretoInput.addEventListener('focus', removeOutlines);
            return false
        }
        const incorretaObject = {
            conteudo: incorretoInput.value,
            correta: false
        }
        alernativasArray.push(incorretaObject)
    }

    const reqObject = {
        titulo: pergunta.value,
        alternativas: alernativasArray
    }

    perguntasArray.push(reqObject)
}

function removeOutlines() {
    document.querySelectorAll('*').forEach(el => {
      el.style.outline = 'none';
    });
  }


function putInputsValue(id, arrayIndex, req){

    const index = arrayIndex - 1
    
    const quizQuestions = req.quizz.perguntas[index]
    
    if(!quizQuestions){
        return
    }

    const question = document.querySelector(id)

    const corretaInput = question.querySelector('.correctInput')
    const corretaInputSelected = quizQuestions.alternativas[0]
    corretaInput.value = corretaInputSelected.conteudo
    adjustTextareaHeight(corretaInput)

    for(let num = 1; num <=3; num++){
        const incorretoInput = question.querySelector(`.incorrectInput${num}`)
        const incorretoInputSelected = quizQuestions.alternativas[num]
        incorretoInput.value = incorretoInputSelected.conteudo
        adjustTextareaHeight(incorretoInput)
    }

    const pergunta = question.querySelector('#inputHead')
    pergunta.value = quizQuestions.titulo
    adjustTextareaHeight(pergunta)
}

function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}