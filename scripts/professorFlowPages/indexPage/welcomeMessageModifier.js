// função pega por parametro o nome do aluno e insere no boas vindas
export function welcomeMessageModifier(usuario) {
    const welcomeMsg = document.body.querySelector(".bemvindo")

    welcomeMsg.innerText = `Bem vindo, Prof. ${usuario.nome}`
}