import { getOnBackUserByToken, getOnBackQuizzesById, checkOnBackIfUserInDisciplina, getOnBackQuizzesById } from "../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "../disciplinasPage/takeSubjectIdByParams.js"
import { checkIfStudentIsInSubject } from "../disciplinasPage/checkIfStudentIsInSubject.js"


export async function checkUserQuizzRelation(token) {
    try {
        const takeUserId = await getOnBackUserByToken(token)
        const quizzId = await getOnBackQuizzesById(token, takeSubjectIdByParams())
        const disciplinaId = quizzId.quizz.disciplina_id
        
        const response = await checkOnBackIfUserInDisciplina(token, takeUserId.usuario._id, disciplinaId)
        
        checkIfStudentIsInSubject(response)
    } catch (error) {
        console.log(error)
    }
}