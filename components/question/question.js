import { generateQuestionIa } from "../../scripts/fetchDbFunctions.js"
import { Dialog } from "../dialog/dialog.js"
import { Input } from "../input/input.js"
import { LongText } from "../longText/longText.js"


export function Question({title, id}){
    const div = document.createElement('div')
    div.id = id
    div.classList.add('question-div-box')

    const loading = document.createElement('div')
    loading.id = "loading"
    loading.classList.add('loader-2')
    div.append(loading)

    const titleDiv = document.createElement('div')
    titleDiv.classList.add('input-label')
    const titleH2 = document.createElement('h2')
    titleH2.innerText = title
    titleDiv.append(titleH2)
    div.append(titleDiv )

    const head = LongText({ 
        placeholder: "Digite aqui a sua pergunta...",
        style: "small",
        id: "inputHead",  
    })
    const textarea = head.querySelector('.longText-area')
    textarea.rows = "1"

    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    textarea.addEventListener('input', function () {
        adjustTextareaHeight(this)
      });
    div.append(head)


    const inputDialogUser = Input({
        style: "outline",
        id: "dialogInput",
        error: "Não pode ser um campo vazio.",
        type: "text"
    })

    const checkBoxDetail = document.createElement("fieldset")
    checkBoxDetail.innerHTML = 
            `
                <legend>Escolha o nível de detalhe :</legend>
                <div>
                    <input type="checkbox" id="detail" name="detail"/>
                    <label for="detail">Questão com mais detalhes</label>
                </div>

            `


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
                        const inputElement = div.querySelector('#dialogInput')
                        const checkBox = div.querySelector('#detail');
                        const checkBoxValue = checkBox.value
                        const inputValue = inputElement ? inputElement.value : '';
                        console.log(checkBoxValue);
                        
                        const objectQuestion = await fetchQuestion(inputValue, checkBoxValue, id)
                        if(objectQuestion){
                            const iHead = div.querySelector('#inputHead')
                            iHead.value = objectQuestion.pergunta
                            adjustTextareaHeight(iHead)
                            let teste = 1
                            for(const alternativa of objectQuestion.alternativas){
                                
                                if(alternativa.correta){
                                    const correct = div.querySelector('.correctInput')
                                    correct.value = alternativa.conteudo
                                    adjustTextareaHeight(correct)
                                } else{
                                    const incorrect = div.querySelector(`.incorrectInput${teste}`)
                                    
                                    incorrect.value = alternativa.conteudo
                                    adjustTextareaHeight(incorrect)
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
    dialogInputDiv.append(checkBoxDetail)

    const labelDiv = div.querySelector('.input-label')
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

    const correctAwnserInput = document.createElement('textarea')
    correctAwnserInput.classList.add('correctInput')
    correctAwnserInput.placeholder = "Digite a resposta correta..."
    correctAwnserInput.rows = "1" 
    correctAwnserInput.addEventListener('input', function () {
        adjustTextareaHeight(this)
      });
    inputAwnserCorrectDiv.append(correctAwnserInput)
    inputAwnsersBox.append(inputAwnserCorrectDiv)
    
    for(let num = 1; num <= 3; num++){
        const inputAwnserIncorrectDiv = document.createElement('div')
        inputAwnserIncorrectDiv.classList.add('inputAwnserIncorrectDiv')

        const incorrectAwnserImg = document.createElement('img')
        incorrectAwnserImg.src = "/components/toaster/img/errorCircle.svg"
        inputAwnserIncorrectDiv.append(incorrectAwnserImg)
        
        const incorrectAwnserInput = document.createElement('textarea')
        incorrectAwnserInput.classList.add(`incorrectInput${num}`)
        incorrectAwnserInput.placeholder = "Digite aqui uma alternativa incorreta..."
        incorrectAwnserInput.rows = "1" 
        incorrectAwnserInput.addEventListener('input', function () {
            adjustTextareaHeight(this)
          }); 
        inputAwnserIncorrectDiv.append(incorrectAwnserInput)
        inputAwnsersBox.append(inputAwnserIncorrectDiv)
    }
    div.append(inputAwnsersBox)
    div.append(dialogIa)

    return div
}


async function generateQuestion(value, checkbox) {
    if(!value){
        return console.log("campo vazio");
        
    }
    let object = {}
    if(checkbox){
        object = {
            input: value,
            detalhada: true
        }
    } else{
        object = {
            input: value
        }
    }
    const response = await generateQuestionIa(object)
    
    if(!response){
        return console.log("Deu errado a requisição");
        
    }
    
    return response.data;
    
}

async function fetchQuestion(inputValue, checkbox, id) {
    const element = document.getElementById(id)
    
    const loadingElement = element.querySelector('#loading');

    try {
        // Mostrar o indicador de carregamento
        loadingElement.style.display = 'block';

        // Chame a função assíncrona
        const objectQuestion = await generateQuestion(inputValue, checkbox);

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