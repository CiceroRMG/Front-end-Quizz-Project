// tenho que fazer isso no back e não no front
// sempre lembrar que o front é o que roda no pc da pessoa

import { getOnBackUserByToken, getOnBackDisciplinaById, checkOnBackIfUserInDisciplina} from "../../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"

export async function checkIfStudentIsInSubject(objeto){

    try {
       if(objeto.status === 404){
        alert(objeto.msg)
        history.back()
       } else{
        console.log(objeto.msg)
       }
        

    } catch(error){
        console.log(error)
    }

}

export async function checkUserSubjectRelation(token) {
    try {
        const takeUserId = await getOnBackUserByToken(token)
        const subjectId = await getOnBackDisciplinaById(takeSubjectIdByParams())
        const response = await checkOnBackIfUserInDisciplina(takeUserId.usuario._id, subjectId.disciplina._id)
        
        checkIfStudentIsInSubject(response)
    } catch (error) {
        console.log(error)
    }
}