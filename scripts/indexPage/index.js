import { getOnBackUserById, getOnBackDisciplinasUsersTable} from "../fetchDbFunctions.js"
import { welcomeMessageModifier } from "./welcomeMessageModifier.js"
import { searchAndDisplayStudentSubjects } from "./searchAndDisplayStudentSubjects.js";

// recebendo os IDs como parametro
const takeUserById = getOnBackUserById("665dc98e16f3d2eb052f7365")
const takeDisciplinaDoUsuarioById = getOnBackDisciplinasUsersTable("665dc98e16f3d2eb052f7365")

// rodando as funções com a resposta das requisições
takeUserById.then(usuario => welcomeMessageModifier(usuario))
takeDisciplinaDoUsuarioById.then(array => searchAndDisplayStudentSubjects(array))


