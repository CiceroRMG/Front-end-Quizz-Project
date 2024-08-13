import { checkTypeUser } from "../../../scripts/checkTypeUser.js";
import { checkIfValidToken } from "../../../scripts/pushToLoginPage.js";


document.addEventListener('DOMContentLoaded', async () => {
    await checkIfValidToken();

    await checkTypeUser('admin')
});