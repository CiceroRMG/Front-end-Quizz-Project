import { checkIfValidToken } from "../../pushToLoginPage.js";
import { loader } from "../../loader.js";
import { checkTypeUser } from "../../checkTypeUser.js";

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Verificando token na inicialização");
    await checkIfValidToken();

    await checkTypeUser('admin')

});



