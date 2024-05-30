// função recebe o objeto disciplina la do banco correspondente a um usuario e cria cada componente na tela
export function createSubjectsOnPage(Disciplina){
    const ul = document.querySelector(".main-list")
    
    const li = document.createElement("li")
    li.classList.add("main-list-content")
    
    const btn = document.createElement("button")
    btn.classList.add("main-list-btn")
    btn.innerText = `${Disciplina.nome.toUpperCase()} - ${Disciplina.ano}/${Disciplina.semestre}`
    
    li.append(btn)
    ul.append(li)
}