// mostra a div que fala que não possui disciplinas
export function noRegister(){
    const div = document.querySelector('.empty-subjects')
    div.classList.add('hidden')
    div.classList.remove('animate-in')
}

export function register(){
    const div = document.querySelector('.empty-subjects')
    div.classList.remove('hidden')
    div.classList.add('animate-in')
}