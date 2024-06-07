import { getOnBackUserById, getOnBackDisciplinasUsersTable} from "../fetchDbFunctions.js"
import { welcomeMessageModifier } from "./welcomeMessageModifier.js"
import { searchAndDisplayStudentSubjects } from "./searchAndDisplayStudentSubjects.js";

// recebendo os IDs como parametro
const takeUserById = getOnBackUserById(id)
const takeDisciplinaDoUsuarioById = getOnBackDisciplinasUsersTable(id)

// rodando as funções com a resposta das requisições
takeUserById.then(usuario => welcomeMessageModifier(usuario))
takeDisciplinaDoUsuarioById.then(array => searchAndDisplayStudentSubjects(array))


