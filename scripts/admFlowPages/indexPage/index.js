import { checkIfValidToken } from "../../pushToLoginPage.js";
import { checkTypeUser } from "../../checkTypeUser.js";
import { based_url } from "../../config.js";
import { navArrowBar } from "../navArrowBar.js";
import { loader } from "../../loader.js";

loader()
navArrowBar()

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();

    await checkTypeUser('admin')

});

const disciplinaBtn = document.getElementById('disciplina-btn')

disciplinaBtn.addEventListener('click', ()=> window.location.href = `${based_url}/html/admFlowPages/painel.html`)



