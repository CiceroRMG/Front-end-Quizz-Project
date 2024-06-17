import { getOnBackDisciplinaById, getOnBackQuizzesById, getOnBackUserByToken, checkOnBackIfUserInDisciplina } from "../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"
import { backPage } from "./backBtn.js"
import { nameOfSubjectModifier } from "./nameOfSubjectModifier.js"
import { createQuizzesOnPage } from "./createQuizzesOnPage.js"
import { toggleQuizzes } from "./toggleQuizzes.js"
import { getTokenOnLocalStorage } from "../getTokenOnLocalStorage.js"
import { checkUserSubjectRelation } from "./checkIfStudentIsInSubject.js"
import { checkIfValidToken } from "../pushToLoginPage.js"


const loading = document.querySelector('.loader')
const content = document.querySelector('.main')

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        loading.classList.add('hidden')
        content.classList.remove('hidden')
        content.classList.add('fade-in')
    }, 500)
})

backPage()
        
document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();

    const token = getTokenOnLocalStorage()

    await checkUserSubjectRelation(token)    
    
    // essa parte pega o Id no parametro e ve qual disciplina corresponde, depois coloca o nome da disciplina no titulo

    const takeDisciplinaById = await getOnBackDisciplinaById(takeSubjectIdByParams())
    nameOfSubjectModifier(takeDisciplinaById.disciplina)


    // essa parte pega os quizzes da disciplina pelo parametro -> id da disciplina clicada
    const takeAllQuizzesOfASubject = await getOnBackQuizzesById(takeSubjectIdByParams())

    for (const quizz of takeAllQuizzesOfASubject.quizz){
        if (!takeAllQuizzesOfASubject.quizz){
            toggleQuizzes.emptyQuizzes()
            return console.log("Essa disciplina não possui quizzes")
        }
        createQuizzesOnPage(quizz)     
    }
});



