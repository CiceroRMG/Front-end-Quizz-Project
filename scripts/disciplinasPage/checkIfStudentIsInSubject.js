import { getOnBackDisciplinaById } from "../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"

export async function checkIfStudentIsInSubject(token, arrayDeDisciplinasDoAluno){
    if(!arrayDeDisciplinasDoAluno){
        return console.log("Esse aluno não possui disciplinas")

    }
    try {

        let check = false
        const disciplinaAtual = (await getOnBackDisciplinaById(token, takeSubjectIdByParams())).disciplina._id
    
        for (const objetoAlunoDisciplina of arrayDeDisciplinasDoAluno){
            const disciplinaDoAluno = objetoAlunoDisciplina.disciplina_id
    
            if(disciplinaDoAluno === disciplinaAtual){
                check = true
            }
        }
    
        if(!check){
            alert('Esse usuario não tem permissao para entrar na disciplina')
            return history.back()
        }
    
        return console.log('Usuario possui a disciplina')

    } catch(error){
        console.log(error)
    }

}