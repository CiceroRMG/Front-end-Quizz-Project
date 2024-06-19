// só adiciona ou remove a classe hidden da div que mostra que não tem disciplinas
export const toggleSubjects = {
    notEmptySubjects() {
        const div = document.querySelector('.empty-subjects')
        div.classList.add("hidden")
    },

    emptySubjects() {
        const div = document.querySelector('.empty-subjects')
        div.classList.remove("hidden")
    }
}
