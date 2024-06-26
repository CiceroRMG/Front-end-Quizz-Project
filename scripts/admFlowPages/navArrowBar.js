export function navArrowBar(){
    const arrow = document.querySelector('.arrow-nav')
    const items = document.querySelector('#arrow-nav-items')
    const a = document.querySelector('.painel-nav-btn')

    arrow.addEventListener('click', toogleNavArrow)
    a.addEventListener('click', toogleNavArrow)

    function toogleNavArrow(){
        items.classList.toggle('hidden')
        items.classList.toggle('animate-in')
        arrow.classList.toggle('select')
    }
}