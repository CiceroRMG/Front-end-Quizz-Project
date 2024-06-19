import { getOnBackUserByToken, getOnBackDisciplinasOfProfessorById} from "../../fetchDbFunctions.js"
import { welcomeMessageModifier } from "./welcomeMessageModifier.js"
import { searchAndDisplayProfSubjects } from "./searchAndDisplayProfSubjects.js";
import { getTokenOnLocalStorage } from "../../getTokenOnLocalStorage.js";
import { checkIfValidToken } from "../../pushToLoginPage.js";
import { loader } from "../../loader.js";
import { checkTypeUser } from "../../checkTypeUser.js";

loader()



document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();

    await checkTypeUser('professor')
    
    // recebe o objeto usuario do banco mandando o token de autenticação
    const takeUserById = await getOnBackUserByToken(getTokenOnLocalStorage())

    // ja com o objeto usuario em mãos, roda as funções que dependendem do id do usuario para funcionar e ja manda o token junto no header
    const takeSubjectsOfProf = await getOnBackDisciplinasOfProfessorById(takeUserById.usuario._id)
    searchAndDisplayProfSubjects(takeSubjectsOfProf.disciplinas)


    // função que mostra o nome do usuario na tela
    welcomeMessageModifier(takeUserById.usuario)
});



