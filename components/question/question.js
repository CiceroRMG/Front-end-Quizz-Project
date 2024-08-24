import { generateQuestionIa } from "../../scripts/fetchDbFunctions.js"
import { Dialog } from "../dialog/dialog.js"
import { Input } from "../input/input.js"


export function Question({title, id}){
    const div = document.createElement('div')
    div.id = id
    div.classList.add('question-div-box')

    const loading = document.createElement('div')
    loading.id = "loading"
    loading.classList.add('loader-2')
    div.append(loading)

    const head = Input({ 
        label: title,  
        placeholder: "Digite aqui a sua pergunta...",
        style: "outline",
        id: "inputHead",     
        error: "Esse campo não pode ficar vazio",
        type: "text"
    })
    div.append(head)

    const inputDialogUser = Input({
        style: "outline",
        id: "dialogInput",
        error: "Não pode ser um campo vazio.",
        type: "text"
    })

    const dialogIa = Dialog(
        {
            title: `Gerar Questão para ${title}`,
            paragraph: "Digite um assunto para IA gerar uma questão.",
            dialogButtons: [
                {
                    text: "Cancelar",
                    type: "outline-md",
                    onclick(){
                        const dialog = div.querySelector('.dialog')
                        dialog.close()
                    }
                },
                {
                    text: "Gerar",
                    type: "primary-md",
                    async onclick(){
                        const inputElement = div.querySelector('#dialogInput');
                        const inputValue = inputElement ? inputElement.value : '';
                        const objectQuestion = await fetchQuestion(inputValue, id)
                        if(objectQuestion){
                            const iHead = div.querySelector('#inputHead')
                            iHead.value = objectQuestion.pergunta
                            let teste = 1
                            for(const alternativa of objectQuestion.alternativas){
                                
                                if(alternativa.correta){
                                    const correct = div.querySelector('.correctInput')
                                    correct.value = alternativa.conteudo
                                } else{
                                    const incorrect = div.querySelector(`.incorrectInput${teste}`)
                                    
                                    incorrect.value = alternativa.conteudo
                                    teste += 1
                                }
                            }
                        };
                    }
                },
            ], 
        }
    )

    const dialogInputDiv = dialogIa.querySelector('.dialog-p')
    dialogInputDiv.append(inputDialogUser)

    const labelDiv = head.querySelector('.input-label')
    const generateImg = document.createElement('img')
    generateImg.onclick = () => {
        dialogIa.showModal()
        dialogIa.classList.add('animate-in')
    }
    generateImg.src = "/components/question/img/generate.svg"
    labelDiv.append(generateImg)

    const inputAwnsersBox = document.createElement('div')
    inputAwnsersBox.classList.add('inputAwnsersBox')

    const inputAwnserCorrectDiv = document.createElement('div')
    inputAwnserCorrectDiv.classList.add('inputAwnserCorrectDiv')
    const correctAwnserImg = document.createElement('img')
    correctAwnserImg.src = "/components/toaster/img/checkCircle.svg"
    inputAwnserCorrectDiv.append(correctAwnserImg)

    const correctAwnserInput = document.createElement('input')
    correctAwnserInput.classList.add('correctInput')
    correctAwnserInput.placeholder = "Digite a resposta correta..." 
    inputAwnserCorrectDiv.append(correctAwnserInput)
    inputAwnsersBox.append(inputAwnserCorrectDiv)
    
    for(let num = 1; num <= 3; num++){
        const inputAwnserIncorrectDiv = document.createElement('div')
        inputAwnserIncorrectDiv.classList.add('inputAwnserIncorrectDiv')

        const incorrectAwnserImg = document.createElement('img')
        incorrectAwnserImg.src = "/components/toaster/img/errorCircle.svg"
        inputAwnserIncorrectDiv.append(incorrectAwnserImg)
        
        const incorrectAwnserInput = document.createElement('input')
        incorrectAwnserInput.classList.add(`incorrectInput${num}`)
        incorrectAwnserInput.placeholder = "Digite aqui uma alternativa incorreta..." 
        inputAwnserIncorrectDiv.append(incorrectAwnserInput)
        inputAwnsersBox.append(inputAwnserIncorrectDiv)
    }
    div.append(inputAwnsersBox)
    div.append(dialogIa)

    return div
}


async function generateQuestion(value) {
    if(!value){
        return console.log("campo vazio");
        
    }

    const object = {
        input: value
    }
    const response = await generateQuestionIa(object)
    
    if(!response){
        return console.log("Deu errado a requisição");
        
    }
    
    return response.data;
    
}

async function fetchQuestion(inputValue, id) {
    const element = document.getElementById(id)
    
    const loadingElement = element.querySelector('#loading');

    try {
        // Mostrar o indicador de carregamento
        loadingElement.style.display = 'block';

        // Chame a função assíncrona
        const objectQuestion = await generateQuestion(inputValue);

        // Esconder o indicador de carregamento
        loadingElement.style.display = 'none';

        // Retorne o resultado
        return objectQuestion;
    } catch (error) {
        // Esconder o indicador de carregamento em caso de erro
        loadingElement.style.display = 'none';
        console.error("Erro ao carregar a pergunta:", error);
    }
}