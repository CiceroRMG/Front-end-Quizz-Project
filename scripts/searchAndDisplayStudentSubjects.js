// função recebe uma array do alunoDisciplina com o id correspondente pelo parametro;
// retorna todas as disciplinas relacionadas ao aluno;
// chama função para criar os elementos disciplinas na tela

import { createSubjectsOnPage } from "./createSubjectsOnPage.js"; // cria as disciplinas na pagina
import { getOnBackDisciplinaById } from "./fetchDbFunctions.js"; // busca a disciplina pelo id

export async function searchAndDisplayStudentSubjects(disciplinasDoUsuario){
    for (const disciplina of disciplinasDoUsuario) {
        const idDaDisciplina = disciplina.disciplina_id;
        const pegandoADisciplinaPeloId = await getOnBackDisciplinaById(idDaDisciplina);
        createSubjectsOnPage(pegandoADisciplinaPeloId);
    }
}