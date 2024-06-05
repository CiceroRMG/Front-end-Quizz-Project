// função pega por parametro o nome do aluno e insere no boas vindas
export function welcomeMessageModifier(usuario) {
    const welcomeMsg = document.body.querySelector(".bemvindo")
    const matricula = String(usuario.matricula)

    welcomeMsg.innerText = `Bem vindo, ${usuario.nome}`
}