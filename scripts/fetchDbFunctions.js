
import { checkIfValidToken } from "./pushToLoginPage.js";

async function fetchWithToken(url, options = {}) {
    // Verifica e renova o token se necessário
    const tokenIsValid = await checkIfValidToken();
    if (!tokenIsValid) {
        console.log("Token e refreshtoken inválido e a atualização deles falhou também");
        return null;
    }

    const token = window.localStorage.getItem('token');

    // Atualiza o token do header da requisição
    if (!options.headers) {
        options.headers = {};
    }
    options.headers['authorization'] = `${token}`;

    const response = await fetch(url, options);

    return response;
}

export async function registerDisciplina(objeto){
    const pegando = await fetchWithToken('http://localhost:3333/disciplinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível criar a disciplina' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}

export async function deleteDisciplinaById(id){
    const pegando = await fetchWithToken(`http://localhost:3333/disciplinas/${id}`, {
        method: 'DELETE',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível deletar a disciplina' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}

export async function editDisciplina(objeto, id){
    const pegando = await fetchWithToken(`http://localhost:3333/disciplinas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível editar a disciplina' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}



// função pega o usuario no db pelo parametro id
export async function getOnBackUserById(id) {
    const pegando = await fetchWithToken(`http://localhost:3333/users/${id}`)
    if(!pegando){
        return console.log("A requisição de pegar o usuario pelo ID falhou")
    }

    const data = await pegando.json()

    const usuario = data.user
    return {usuario, token: window.localStorage.getItem('token')}
}

// função pega o usuario no db pelo token
export async function getOnBackUserByToken(token) {
    const pegando = await fetchWithToken('http://localhost:3333/userToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ token })
      });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta de usuario pelo token' }
    }

    const data = await pegando.json()

    const usuario = data.usuario
    return { usuario, token: window.localStorage.getItem('token') }
}

export async function getOnBackUserTypeByToken() {
    const pegando = await fetchWithToken('http://localhost:3333/userToken')

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta do tipo do usuario pelo token' }
    }

    const data = await pegando.json()

    const usuario = data.usuario
    return { usuario }
}


// função pega o usuario-disciplina no db pelo parametro id -> o parametro id pode ser tanto um id de aluno quanto um id de disciplina
export async function getOnBackDisciplinasUsersTable(id) {
    const pegando = await fetchWithToken(`http://localhost:3333/usersDisciplinas/${id}`)
    if(!pegando){
        return console.log("A requisição de pegar a relação alunoDisciplina pelo ID falhou")
    }

    const data = await pegando.json()

    const disciplinasComAlunos = data.alunoDisciplina
    return {disciplinasComAlunos, token: window.localStorage.getItem('token')}
}

export async function checkOnBackIfUserInDisciplina(userId, subjectId) {
    const pegando = await fetchWithToken(`http://localhost:3333/usersDisciplinas/${userId}/${subjectId}`)

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Usuário não tem permissão para acessar a disciplina' }
    }

    const data = await pegando.json()
    return data
}

// função pega a disciplina no db pelo parametro id 
export async function getOnBackDisciplinaById(id) {
    const pegando = await fetchWithToken(`http://localhost:3333/disciplinas/${id}`);
    if(!pegando){
        return console.log("A requisição de pegar discplina pelo ID falhou")
    }

    const data = await pegando.json();

    const disciplina = data.disciplina
    return {disciplina, token: window.localStorage.getItem('token')};
}

export async function getAllDisciplinasIfProfessorName(){
    const pegando = await fetchWithToken(`http://localhost:3333/disciplinas/painel/data`);
    if(!pegando){
        return console.log("A requisição de pegar todas as discplinas falhou")
    }

    const data = await pegando.json();

    const disciplinas = data.disciplinas
    return {disciplinas};
}

export async function getOnBackDisciplinasOfProfessorById(id) {
    const pegando = await fetchWithToken(`http://localhost:3333/disciplinas/prof/${id}`);
    if(!pegando){
        return console.log("A requisição de pegar as discplinas do professor pelo ID falhou")
    }

    const data = await pegando.json();
    const disciplinas = data.disciplinas
    return { disciplinas };
}


// o id parametro dessa função pode ser tanto um id de um quizz quanto o id de uma disciplina
export async function getOnBackQuizzesById(id) {
    const pegando = await fetchWithToken(`http://localhost:3333/quizzes/${id}`)
    if(!pegando){
        return console.log("A requisição de pegar quizz pelo ID falhou")
    }
    const data = await pegando.json()

    const quizz = data.quizz
    return {quizz, token: window.localStorage.getItem('token')}
}

export async function getOnBackAllProfessor(){
    const pegando = await fetchWithToken('http://localhost:3333/users/register/getAllProfessor')

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta de requisitar todos os professores' }
    }

    const data = await pegando.json()

    const professores = data.professores
    return { professores }
}



