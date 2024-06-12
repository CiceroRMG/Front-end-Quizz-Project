import { getOnBackDisciplinasUsersTable, getOnBackUserByToken} from "../fetchDbFunctions.js"
import { welcomeMessageModifier } from "./welcomeMessageModifier.js"
import { searchAndDisplayStudentSubjects } from "./searchAndDisplayStudentSubjects.js";
import { getTokenOnLocalStorage } from "../getTokenOnLocalStorage.js";


const loading = document.querySelector('.loader')
const content = document.querySelector('.main')

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        loading.classList.add('hidden')
        content.classList.remove('hidden')
        content.classList.add('fade-in')
    }, 500)
})

// recebe o objeto usuario do banco mandando o token de autenticação
const takeUserById = getOnBackUserByToken(getTokenOnLocalStorage())

// ja com o objeto usuario em mãos, roda as funções que dependendem do id do usuario para funcionar e ja manda o token junto no header
takeUserById
    .then(objeto => getOnBackDisciplinasUsersTable(objeto.token, objeto.usuario._id))
    .then(objeto => searchAndDisplayStudentSubjects(objeto.token, objeto.disciplinasComAlunos))


// função que mostra o nome do usuario na tela
takeUserById.then(objeto => welcomeMessageModifier(objeto.usuario))


