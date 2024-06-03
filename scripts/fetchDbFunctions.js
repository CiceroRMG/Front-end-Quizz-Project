// eu poderia fazer tudo em uma função só, colocando a rota como um parametro, mas ele retornaria toda requisição, 
// inclusive o msg que vem junto, por isso separei por rota

// função pega o usuario no db pelo parametro id
export async function getOnBackUserById(id) {
    const pegando = await fetch(`http://localhost:3333/users/${id}`)
    const data = await pegando.json()

    const usuario = data.user
    return usuario
}

// função pega o usuario-disciplina no db pelo parametro id -> o parametro id pode ser tanto um id de aluno quanto um id de disciplina
export async function getOnBackDisciplinasUsersTable(id) {
    const pegando = await fetch(`http://localhost:3333/usersDisciplinas/${id}`)
    const data = await pegando.json()

    const disciplinasComAlunos = data.alunoDisciplina
    return disciplinasComAlunos
}

// função pega a disciplina no db pelo parametro id 
export async function getOnBackDisciplinaById(id) {
    const pegando = await fetch(`http://localhost:3333/disciplinas/${id}`);
    const data = await pegando.json();

    const disciplina = data.disciplina
    return disciplina;
}



