import { getOnBackQuizzesById } from "../fetchDbFunctions.js"
import { takeQuizzIdByParams } from "./takeQuizzIdByParams.js"
import { backPage } from "../disciplinasPage/backBtn.js"
import { informationsPageOfQuizzModifier } from "./informationsPageOfQuizzModifier.js"

import { getTokenOnLocalStorage } from "../getTokenOnLocalStorage.js"
import { checkUserQuizzRelation } from "./checkIfUserHaveQuizz.js"

const token = getTokenOnLocalStorage()

// verifica se o usuario possui a disciplina que contem o quizz em questão
checkUserQuizzRelation(token)


// pega o quizz no BD por ID parametro e coloca todas as informações na página do quiz
const takeQuizzById = getOnBackQuizzesById(token, takeQuizzIdByParams())
takeQuizzById.then(objeto => informationsPageOfQuizzModifier(objeto.token, objeto.quizz))

backPage()


