import { getOnBackUserTypeByToken } from "./fetchDbFunctions.js"

export async function checkTypeUser(type){
    const getType = await getOnBackUserTypeByToken()
    if (getType.usuario !== type){
        alert('Usuario não tem permissão para acessar a pagina')
        return history.back()
    }
}

export async function checkTypeAdminAndProfessor(admin, professor) {
    const getType = await getOnBackUserTypeByToken()
    if (getType.usuario !== admin && getType.usuario !== professor){
        alert('Usuario não tem permissão para acessar a pagina')
        return history.back()
    }
}
