import { getOnBackDisciplinaById } from "../fetchDbFunctions.js"


export async function informationsPageOfQuizzModifier(Quizz) {
    // muda o nome do quizz
    const quizzName = document.body.querySelector(".quizz-name")
    const quizz = Quizz[0]
    quizzName.innerText = `${quizz.titulo}`

    // muda o nome da disciplina
    const disciplina = await getOnBackDisciplinaById(quizz.disciplina_id)
    const subjectName = document.body.querySelector(".main-subtitle")
    subjectName.innerText = `${disciplina.nome}`

    // coloca o tempo em horas ou minutos
    const time = document.querySelector(".time")
    if(quizz.tempo > 6){
        time.innerText = `${quizz.tempo} min`
    } else {
        time.innerText = `${quizz.tempo} hr`
    }
    
    // coloca o numero de tentativas na tela
    const attempts = document.querySelector(".attempts")
    attempts.innerText = `${quizz.tentativas} tentativas`

    // coloca a mensagem de orientacao do professor
    const orientacao = document.querySelector(".orientacao-p")
    orientacao.innerText = `${quizz.mensagem}`

    const date = document.querySelector(".data-entrega")
    date.innerText = `${quizz.data_fim}`
}

