import { getOnBackQuizzesById } from "../fetchDbFunctions.js"
import { takeQuizzIdByParams } from "./takeQuizzIdByParams.js"
import { backPage } from "../disciplinasPage/backBtn.js"
import { informationsPageOfQuizzModifier } from "./informationsPageOfQuizzModifier.js"

// pega o quizz no BD por ID parametro e coloca todas as informações na página do quiz
const takeQuizzById = getOnBackQuizzesById(takeQuizzIdByParams())
takeQuizzById.then(quizz => informationsPageOfQuizzModifier(quizz))

backPage()


