// select das disciplinas

export function selectSubjects(){
    const selectSubject = document.querySelector('.select-btn')
    selectSubject.addEventListener('click', ()=>{
        const select = document.querySelector('.div-select')
        select.classList.toggle('hidden')
        select.classList.toggle('fade-in')
    })
}