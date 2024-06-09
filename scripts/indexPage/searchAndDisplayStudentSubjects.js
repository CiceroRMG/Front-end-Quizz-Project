// função recebe uma array do alunoDisciplina com o id correspondente pelo parametro;
// retorna todas as disciplinas relacionadas ao aluno;
// chama função para criar os elementos disciplinas na tela

import { createSubjectsOnPage } from "./createSubjectsOnPage.js" // cria as disciplinas na pagina
import { getOnBackDisciplinaById } from "../fetchDbFunctions.js"; // busca a disciplina pelo id
import { toggleSubjects } from "./toggleSubjects.js";

export async function searchAndDisplayStudentSubjects(token, disciplinasDoUsuario){
    if(!disciplinasDoUsuario){
        toggleSubjects.emptySubjects()
        return console.log("não possui disciplinas")
    }
    for (const disciplina of disciplinasDoUsuario) {
        const idDaDisciplina = disciplina.disciplina_id;
        const pegandoADisciplinaPeloId = await getOnBackDisciplinaById(token, idDaDisciplina);
        createSubjectsOnPage(pegandoADisciplinaPeloId.disciplina);
    }
}