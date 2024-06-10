import { getOnBackDisciplinaById } from "../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"

// tenho que fazer isso no back e não no front
// sempre lembrar que o front é o que roda no pc da pessoa

export async function checkIfStudentIsInSubject(objeto){

    try {

       if(objeto.status){
        alert(objeto.msg)
        history.back()
       } else{
        console.log(objeto.msg)
       }
        

    } catch(error){
        console.log(error)
    }

}