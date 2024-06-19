// recebe o objeto dos quizzes e criar as li de cada quizz com o link passando o ID
import { toggleQuizzes } from "./toggleQuizzes.js"
import { based_url } from "../../config.js"

export function createQuizzesOnPage(Quizz){
    toggleQuizzes.notEmptyQuizzes()
    const ul = document.querySelector(".main-list")

    const li = document.createElement('li')
    li.classList.add("main-list-content")

    let tipoDoQuizz = "Quizz"
    if(Quizz.tipo === "exercicio"){
        tipoDoQuizz = "Exercício"
    } else if (Quizz.tipo === "prova"){
        tipoDoQuizz = "Prova"
    }

    const btn = document.createElement("button")
    btn.classList.add("main-list-btn")
    btn.addEventListener('click', ()=>{
        window.location.href = `${based_url}/html/alunoFlowPages/quizz.html?id=${Quizz._id}`
    })
    btn.innerHTML = 
        `
        <div class="quizz-name-content">
            <p>${Quizz.titulo}</p>
            <span class="tag-quizz"><p>${tipoDoQuizz}</p></span>
        </div>
        <p class="date">${Quizz.data_fim}</p>
        `
    li.append(btn)
    ul.append(li)
}





