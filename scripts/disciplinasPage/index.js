import { getOnBackDisciplinaById, getOnBackQuizzesById } from "../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"
import { backPage } from "./backBtn.js"
import { nameOfSubjectModifier } from "./nameOfSubjectModifier.js"
import { createQuizzesOnPage } from "./createQuizzesOnPage.js"
import { toggleQuizzes } from "./toggleQuizzes.js"

// essa parte só coloca o nome da disciplina no titulo por enquanto
const takeDisciplinaById = getOnBackDisciplinaById(takeSubjectIdByParams())
takeDisciplinaById.then(disciplina => nameOfSubjectModifier(disciplina))

backPage()

// essa parte pega os quizzes da disciplina que veio pelo parametro
const takeAllQuizzesOfASubject = getOnBackQuizzesById(takeSubjectIdByParams())
takeAllQuizzesOfASubject.then(quizzes => {
    for (const quizz of quizzes){
        if (!quizzes){
            toggleQuizzes.emptyQuizzes()
            return console.log("Essa disciplina não possui quizzes")
        }
        createQuizzesOnPage(quizz)
    }
})


