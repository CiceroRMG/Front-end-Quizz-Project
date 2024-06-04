// só adiciona ou remove a classe hidden da div que mostra que não tem disciplinas
export const toggleQuizzes = {
    notEmptyQuizzes() {
        const div = document.querySelector('.empty-quizz')
        div.classList.add("hidden")
    },

    emptyQuizzes() {
        const div = document.querySelector('.empty-quizz')
        div.classList.remove("hidden")
    }
}
