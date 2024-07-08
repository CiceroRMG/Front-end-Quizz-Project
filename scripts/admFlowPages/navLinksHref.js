import { based_url } from "../config.js"

export function hrefNavLinks(){
    const studentsBtnNav = document.getElementById("alunos-nav-a")
    const professorsBtnNav = document.getElementById("professores-nav-a")
    const disciplinasBtnNav = document.getElementById("disciplinas-nav-a")
    
    disciplinasBtnNav.addEventListener('click', ()=> window.location.href = `${based_url}/html/admFlowPages/painel.html?panel=subjects`)
    studentsBtnNav.addEventListener('click', ()=> window.location.href = `${based_url}/html/admFlowPages/painel.html?panel=students`)
    professorsBtnNav.addEventListener('click', ()=> window.location.href = `${based_url}/html/admFlowPages/painel.html?panel=professors`)
}
