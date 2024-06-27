import { based_url } from "../../config.js"

// muda o href do botao de cadastrar
export function changeBtnHref(caminho){
    const btn = document.querySelector('.createBtn')
    btn.addEventListener('click', ()=> window.location.href = `${based_url}/html/${caminho}`)
}