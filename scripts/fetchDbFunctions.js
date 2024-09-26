
import { baseUrl } from "./config.js";
import { checkIfValidToken } from "./pushToLoginPage.js";

async function fetchWithToken(url, options = {}) {
    const token = window.localStorage.getItem('token');

    // Atualiza o token do header da requisição
    if (!options.headers) {
        options.headers = {};
    }
    options.headers['authorization'] = `${token}`;

    const response = await fetch(url, options);
    if(response.status === 401){
        const tokenIsValid = await checkIfValidToken();
        if (!tokenIsValid) {
            console.log("Token e refreshtoken inválido e a atualização deles falhou também");
            return null;
        }
    }

    return response;
}

export async function registerDisciplina(objeto){
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas`, {
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
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas/${id}`, {
        method: 'DELETE',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível deletar a disciplina' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}

export async function editDisciplina(objeto, id){
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas/${id}`, {
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

export async function getAllDisciplinas(){
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas`)

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta de requisitar todas as disciplinas' }
    }

    const data = await pegando.json()

    const disciplinas = data.disciplinas
    return { disciplinas }
}



// função pega o usuario no db pelo parametro id
export async function getOnBackUserById(id) {
    const pegando = await fetchWithToken(`${baseUrl}/users/${id}`)
    if(!pegando){
        return console.log("A requisição de pegar o usuario pelo ID falhou")
    }

    const data = await pegando.json()

    const usuario = data.user
    return {usuario, token: window.localStorage.getItem('token')}
}

// função pega o usuario no db pelo token
export async function getOnBackUserByToken(token) {
    const pegando = await fetchWithToken(`${baseUrl}/userToken`, {
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

export async function getOnBackUserIfLocalToken() {
    const pegando = await fetchWithToken(`${baseUrl}/userToken/user`, {
        method: 'GET',
      });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta de usuario pelo token' }
    }

    const data = await pegando.json()

    const usuario = data.usuario
    return { usuario }
}

export async function getOnBackUserTypeByToken() {
    const pegando = await fetchWithToken(`${baseUrl}/userToken`)

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta do tipo do usuario pelo token' }
    }

    const data = await pegando.json()

    const usuario = data.usuario
    return { usuario }
}


// função pega o usuario-disciplina no db pelo parametro id -> o parametro id pode ser tanto um id de aluno quanto um id de disciplina
export async function getOnBackDisciplinasUsersTable(id) {
    const pegando = await fetchWithToken(`${baseUrl}/usersDisciplinas/${id}`)
    if(!pegando.ok){
        return ({status: pegando.status, msg: 'Esse id não esta vinculado a nenhum aluno e nenhuma disciplina'})
    }

    const data = await pegando.json()

    const disciplinasComAlunos = data.alunoDisciplina
    return {disciplinasComAlunos, token: window.localStorage.getItem('token')}
}

export async function checkOnBackIfUserInDisciplina(userId, subjectId) {
    const pegando = await fetchWithToken(`${baseUrl}/usersDisciplinas/${userId}/${subjectId}`)

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Usuário não tem permissão para acessar a disciplina' }
    }

    const data = await pegando.json()
    return data
}

// função pega a disciplina no db pelo parametro id 
export async function getOnBackDisciplinaById(id) {
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas/${id}`);
    if(!pegando){
        return console.log("A requisição de pegar discplina pelo ID falhou")
    }

    const data = await pegando.json();

    const disciplina = data.disciplina
    return {disciplina, token: window.localStorage.getItem('token')};
}

export async function getAllDisciplinasIfProfessorName(){
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas/painel/data`);
    if(!pegando){
        return console.log("A requisição de pegar todas as discplinas falhou")
    }

    const data = await pegando.json();

    const disciplinas = data.disciplinas
    return {disciplinas};
}

export async function getOnBackDisciplinasOfProfessorById(id) {
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas/prof/${id}`);
    if(!pegando){
        return console.log("A requisição de pegar as discplinas do professor pelo ID falhou")
    }

    const data = await pegando.json();
    const disciplinas = data.disciplinas
    return { disciplinas };
}

export async function getOnBackDisciplinasOfProfessorByToken() {
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas/prof`);
    if(!pegando){
        return console.log("A requisição de pegar as discplinas do professor pelo token falhou")
    }

    const data = await pegando.json();
    const disciplinas = data.disciplinas
    return { disciplinas };
}


// o id parametro dessa função pode ser tanto um id de um quizz quanto o id de uma disciplina
export async function getOnBackQuizzesById(id) {
    const pegando = await fetchWithToken(`${baseUrl}/quizzes/${id}`)
    if(!pegando){
        return console.log("A requisição de pegar quizz pelo ID falhou")
    }
    const data = await pegando.json()

    const quizz = data.quizz
    return {quizz, token: window.localStorage.getItem('token')}
}

export async function getOnBackAllProfessor(){
    const pegando = await fetchWithToken(`${baseUrl}/users/register/getAllProfessor`)

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta de requisitar todos os professores' }
    }

    const data = await pegando.json()

    const professores = data.professores
    return { professores }
}

export async function getAllStudents(){
    const pegando = await fetchWithToken(`${baseUrl}/users/register/getAllStudents`)

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta de requisitar todos os alunos' }
    }

    const data = await pegando.json()

    const alunos = data.alunos
    return { alunos }
}


export async function deleteUserById(id){
    const pegando = await fetchWithToken(`${baseUrl}/users/${id}`, {
        method: 'DELETE',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível deletar o usuario' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}

export async function registerUser(objeto){
    const pegando = await fetchWithToken(`${baseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        const response = await pegando.json()
        return { status: pegando.status, msg: response.message, info: response.info}
    }

    const data = await pegando.json()
    const user = data.newUser

    return { user, status: pegando.status }
}

export async function registerUserDisciplina(objeto){
    const pegando = await fetchWithToken(`${baseUrl}/usersDisciplinas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível criar a relação entre aluno e disciplina' }
    }

    const data = await pegando.json()
    const userDisciplina = data.response

    return { userDisciplina, status: pegando.status }
}

export async function editUserNoPassword(objeto, id){
    const pegando = await fetchWithToken(`${baseUrl}/users/adm/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível editar o usuario' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}


export async function deleteAllSubjectStudentRelation(id){
    const pegando = await fetchWithToken(`${baseUrl}/usersDisciplinas/${id}`, {
        method: 'DELETE',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível deletar as relações' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}

export async function turnNullSubjectsProfId(id) {
    const pegando = await fetchWithToken(`${baseUrl}/disciplinas/null/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível tornar null os profId' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}

export async function deleteQuizzById(id){
    const pegando = await fetchWithToken(`${baseUrl}/quizzes/${id}`, {
        method: 'DELETE',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível deletar as relações' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg }
}

export async function registerQuiz(objeto){
    const pegando = await fetchWithToken(`${baseUrl}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível criar o quiz' }
    }

    const data = await pegando.json()

    return { data: data, status: pegando.status }
}

export async function editQuiz(objeto, id){
    const pegando = await fetchWithToken(`${baseUrl}/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível criar o quiz' }
    }

    const data = await pegando.json()

    return { data: data, status: pegando.status }
}

export async function registerQuizQuestions(objeto, id){
    const pegando = await fetchWithToken(`${baseUrl}/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível criar as perguntas do quizz' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: pegando.msg }
}

export async function generateQuestionIa(objeto){
    const pegando = await fetchWithToken(`${baseUrl}/ia/generateQuiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível obter a resposta da ia' }
    }

    const data = await pegando.json()

    return { data: data, status: pegando.status }
}

export async function registerStudentAwnsers(objeto){
    const pegando = await fetchWithToken(`${baseUrl}/respostas/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(objeto)
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Não foi possível criar as respostas do aluno' }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg , data: data}
}

export async function verifyUserAttempts(id){
    const pegando = await fetchWithToken(`${baseUrl}/respostas/verifyAttempts/${id}`, {
        method: 'GET',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: "Aluno não possui mais tentativas" }
    }

    const data = await pegando.json()

    return { status: pegando.status, msg: data.msg}
}

export async function getUserAttempts(id){
    const pegando = await fetchWithToken(`${baseUrl}/respostas/${id}`, {
        method: 'GET',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: "Tentativas do aluno" }
    }

    const data = await pegando.json()

    return { attempts: data.attempts}
}


export async function getUserAttemptById(id){
    const pegando = await fetchWithToken(`${baseUrl}/respostas/attempt/${id}`, {
        method: 'GET',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: "Tentativa do aluno" }
    }

    const data = await pegando.json()

    return { attempt: data.attempt}
}


export async function getAllStudentsRespondedQuiz(id){
    const pegando = await fetchWithToken(`${baseUrl}/respostas/responses/${id}`, {
        method: 'GET',
    });

    if (!pegando.ok) {
        return { status: pegando.status, msg: "Tentativas do aluno" }
    }

    const data = await pegando.json()

    return { data }
}