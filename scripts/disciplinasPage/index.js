import { getOnBackDisciplinaById, getOnBackQuizzesById, getOnBackUserByToken, checkOnBackIfUserInDisciplina } from "../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"
import { backPage } from "./backBtn.js"
import { nameOfSubjectModifier } from "./nameOfSubjectModifier.js"
import { createQuizzesOnPage } from "./createQuizzesOnPage.js"
import { toggleQuizzes } from "./toggleQuizzes.js"
import { getTokenOnLocalStorage } from "../getTokenOnLocalStorage.js"
import { checkUserSubjectRelation } from "./checkIfStudentIsInSubject.js"

const token = getTokenOnLocalStorage()
backPage()

// verifica se o aluno pussui a disciplina para ter acesso
checkUserSubjectRelation(token)    
    
// essa parte pega o Id no parametro e ve qual disciplina corresponde, depois coloca o nome da disciplina no titulo

const takeDisciplinaById = getOnBackDisciplinaById(token, takeSubjectIdByParams())
takeDisciplinaById.then(objeto => nameOfSubjectModifier(objeto.disciplina))


// essa parte pega os quizzes da disciplina pelo parametro -> id da disciplina clicada
const takeAllQuizzesOfASubject = getOnBackQuizzesById(token, takeSubjectIdByParams())
takeAllQuizzesOfASubject.then(objeto => {
    for (const quizz of objeto.quizz){
        if (!objeto.quizz){
            toggleQuizzes.emptyQuizzes()
            return console.log("Essa disciplina não possui quizzes")
        }
        createQuizzesOnPage(quizz)
    }
})



