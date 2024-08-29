import { based_url } from "./config.js";
import { getOnBackUserTypeByToken } from "./fetchDbFunctions.js"

export async function checkTypeUser(type){
    const getType = await getOnBackUserTypeByToken()
;    
    if (getType.usuario !== type){
        if(getType.usuario === "admin"){
            window.location.href = `${based_url}/pages/admin/dashboard/dashboard.html`
        }
        if(getType.usuario === "professor"){
            window.location.href = `${based_url}/pages/professor/dashboard/dashboard.html`
        }
        if(getType.usuario === "aluno"){
            window.location.href = `${based_url}/pages/student/dashboard/dashboard.html`
        }
    }

    return true
}

export async function checkTypeAdminAndProfessor(admin, professor) {
    const getType = await getOnBackUserTypeByToken()
    if (getType.usuario !== admin && getType.usuario !== professor){
        alert('Usuario não tem permissão para acessar a pagina')
        return history.back()
    }
}
