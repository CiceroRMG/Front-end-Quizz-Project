export function loader(){
    const loading = document.querySelector('.loader')
    const content = document.querySelector('.main')
    window.addEventListener('load', ()=>{
        setTimeout(()=>{
            loading.classList.add('hidden')
            content.classList.remove('hidden')
            content.classList.add('fade-in')
        }, 300)
    })
}