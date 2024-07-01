import { getOnBackDisciplinaById } from "../../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "../../alunoFlowPages/disciplinasPage/takeSubjectIdByParams.js"

const inputSubjectName = document.querySelector('#subject-name')
const selectProfessor = document.querySelector('#professor-select')
const inputYear = document.querySelector('#data-select')
const selectSemestre = document.querySelector('#semestre-select')

export async function displayValuesOnInputs(){
    const takeDisciplinaById = await getOnBackDisciplinaById(takeSubjectIdByParams())

    inputSubjectName.value = takeDisciplinaById.disciplina.nome
    inputYear.value = takeDisciplinaById.disciplina.ano
    selectSemestre.value = takeDisciplinaById.disciplina.semestre
    if (takeDisciplinaById.disciplina.prof_id) {
        selectProfessor.value = takeDisciplinaById.disciplina.prof_id._id
    }
    
}
