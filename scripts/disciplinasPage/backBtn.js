// volta pagina
export function backPage() {
    const btn = document.querySelector('.back-btn')
    if(btn){
        btn.addEventListener("click", ()=> history.back())
    }
}
