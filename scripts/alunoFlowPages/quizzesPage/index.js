import { getOnBackQuizzesById } from "../../fetchDbFunctions.js"
import { takeQuizzIdByParams } from "./takeQuizzIdByParams.js"
import { backPage } from "../disciplinasPage/backBtn.js"
import { informationsPageOfQuizzModifier } from "./informationsPageOfQuizzModifier.js"

import { getTokenOnLocalStorage } from "../../getTokenOnLocalStorage.js"
import { checkUserQuizzRelation } from "./checkIfUserHaveQuizz.js"
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

    // verifica se o usuario possui a disciplina que contem o quizz em questão
    await checkUserQuizzRelation(token)

    // pega o quizz no BD por ID parametro e coloca todas as informações na página do quiz
    const takeQuizzById = await getOnBackQuizzesById(takeQuizzIdByParams())
    informationsPageOfQuizzModifier(takeQuizzById.quizz)
});



