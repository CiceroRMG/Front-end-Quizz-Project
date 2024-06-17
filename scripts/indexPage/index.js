import { getOnBackDisciplinasUsersTable, getOnBackUserByToken} from "../fetchDbFunctions.js"
import { welcomeMessageModifier } from "./welcomeMessageModifier.js"
import { searchAndDisplayStudentSubjects } from "./searchAndDisplayStudentSubjects.js";
import { getTokenOnLocalStorage } from "../getTokenOnLocalStorage.js";
import { checkIfValidToken } from "../pushToLoginPage.js";


const loading = document.querySelector('.loader')
const content = document.querySelector('.main')

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        loading.classList.add('hidden')
        content.classList.remove('hidden')
        content.classList.add('fade-in')
    }, 500)
})

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();

    // recebe o objeto usuario do banco mandando o token de autenticação
    const takeUserById = await getOnBackUserByToken(getTokenOnLocalStorage())

    // ja com o objeto usuario em mãos, roda as funções que dependendem do id do usuario para funcionar e ja manda o token junto no header
    takeUserById
    const takeRelationUserSubject = await getOnBackDisciplinasUsersTable(takeUserById.usuario._id)
    searchAndDisplayStudentSubjects(takeRelationUserSubject.disciplinasComAlunos)


    // função que mostra o nome do usuario na tela
    welcomeMessageModifier(takeUserById.usuario)
});



