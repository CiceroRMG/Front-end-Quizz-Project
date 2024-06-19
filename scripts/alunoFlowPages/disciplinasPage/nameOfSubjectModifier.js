export function nameOfSubjectModifier(Disciplina) {
    const subjectName = document.body.querySelector(".subject-name")

    subjectName.innerText = `${Disciplina.nome.toUpperCase()} - ${Disciplina.ano}/${Disciplina.semestre}`
}

