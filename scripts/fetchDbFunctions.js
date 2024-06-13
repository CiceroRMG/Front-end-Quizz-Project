// eu poderia fazer tudo em uma função só, colocando a rota como um parametro, mas ele retornaria toda requisição, 
// inclusive o msg que vem junto, por isso separei por rota


/////    Atualização: Todas as requisições agora vão retornar um objeto com o token e a resposta antiga(objeto ou array)     ///////

// função pega o usuario no db pelo parametro id
export async function getOnBackUserById(token, id) {
    const pegando = await fetch(`http://localhost:3333/users/${id}`, {
        headers: {'authorization': token },
    })
    const data = await pegando.json()

    const usuario = data.user
    return {usuario, token}
}

// função pega o usuario no db pelo token
export async function getOnBackUserByToken(token) {
    const pegando = await fetch('http://localhost:3333/userToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': token },
        body: JSON.stringify({ token })
      });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Usuário não tem permissão para acessar a disciplina' }
    }

    const data = await pegando.json()

    const usuario = data.usuario
    return { usuario, token }
}



// função pega o usuario-disciplina no db pelo parametro id -> o parametro id pode ser tanto um id de aluno quanto um id de disciplina
export async function getOnBackDisciplinasUsersTable(token, id) {
    const pegando = await fetch(`http://localhost:3333/usersDisciplinas/${id}`, {
        headers: {'authorization': token },
    })

    const data = await pegando.json()

    const disciplinasComAlunos = data.alunoDisciplina
    return {disciplinasComAlunos, token}
}

export async function checkOnBackIfUserInDisciplina(token, userId, subjectId) {
    const pegando = await fetch(`http://localhost:3333/usersDisciplinas/${userId}/${subjectId}`, {
        headers: {'authorization': token },
    })

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Usuário não tem permissão para acessar a disciplina' }
    }

    const data = await pegando.json()
    return data
}

// função pega a disciplina no db pelo parametro id 
export async function getOnBackDisciplinaById(token, id) {
    const pegando = await fetch(`http://localhost:3333/disciplinas/${id}`, {
        headers: {'authorization': token },
    });
    const data = await pegando.json();

    const disciplina = data.disciplina
    return {disciplina, token};
}

// o id parametro dessa função pode ser tanto um id de um quizz quanto o id de uma disciplina
export async function getOnBackQuizzesById(token, id) {
    const pegando = await fetch(`http://localhost:3333/quizzes/${id}`, {
        headers: {'authorization': token },
    })
    const data = await pegando.json()

    const quizz = data.quizz
    return {quizz, token}
}



