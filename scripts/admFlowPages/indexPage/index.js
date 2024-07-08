import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { based_url } from "../../config.js";
import { navArrowBar } from "../navArrowBar.js";
import { loader } from "../../loader.js";
import { hrefNavLinks } from "../navLinksHref.js";

loader()
navArrowBar()
hrefNavLinks()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();

    await checkTypeUser('admin')
});

const disciplinaBtn = document.getElementById('disciplina-btn')
const studentsBtn = document.getElementById('aluno-btn')
const professorBtn = document.getElementById('professor-btn')


disciplinaBtn.addEventListener('click', ()=> window.location.href = `${based_url}/html/admFlowPages/painel.html?panel=subjects`)
studentsBtn.addEventListener('click', ()=> window.location.href = `${based_url}/html/admFlowPages/painel.html?panel=students`)
professorBtn.addEventListener('click', ()=> window.location.href = `${based_url}/html/admFlowPages/painel.html?panel=professors`)
