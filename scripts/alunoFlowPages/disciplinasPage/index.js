import { getOnBackDisciplinaById, getOnBackQuizzesById} from "../../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"
import { backPage } from "./backBtn.js"
import { nameOfSubjectModifier } from "./nameOfSubjectModifier.js"
import { createQuizzesOnPage } from "./createQuizzesOnPage.js"
import { toggleQuizzes } from "./toggleQuizzes.js"
import { getTokenOnLocalStorage } from "../../getTokenOnLocalStorage.js"
import { checkUserSubjectRelation } from "./checkIfStudentIsInSubject.js"
import { checkIfValidToken } from "../../pushToLoginPage.js"
import { loader } from "../../loader.js";
import { checkTypeUser } from "../../checkTypeUser.js"

loader()

backPage()
        
document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();

    const token = getTokenOnLocalStorage()

    await checkTypeUser('aluno')

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



