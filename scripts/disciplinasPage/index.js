import { getOnBackDisciplinaById } from "../fetchDbFunctions.js"
import { takeSubjectIdByParams } from "./takeSubjectIdByParams.js"
import { backPage } from "./backBtn.js"
import { nameOfSubjectModifier } from "./nameOfSubjectModifier.js"

// pagina de disciplina
const takeDisciplinaById = getOnBackDisciplinaById(takeSubjectIdByParams())
takeDisciplinaById.then(disciplina => nameOfSubjectModifier(disciplina))

backPage()