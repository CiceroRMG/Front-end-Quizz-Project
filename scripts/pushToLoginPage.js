// toda vez que a pagina iniciar vai rodar as seguintes funções
import { getOnBackUserByToken} from "./fetchDbFunctions.js"
import { based_url } from "./config.js"

const token = window.localStorage.getItem('token')

function haveToken(token){
    if (!token){
        console.log("Usuário sem token")
        window.location.href = `${based_url}/html/login.html`
    } else{
        return console.log('Usuario possui token')
    }
}

haveToken(token)

export async function checkIfValidToken(token){
    const whateverReq = await getOnBackUserByToken(token)
    if (whateverReq.status === 401){
        console.log("token invalido ou inexistente")
        window.location.href = `${based_url}/html/login.html`
        return false
    } else {
        return true
    }

}

checkIfValidToken(token)

const logoutBtn = document.querySelector('.logoutBtn')
logoutBtn.addEventListener('click', logout)

function logout(){
    if(token){
        window.localStorage.clear('token')
        window.location.href = `${based_url}/html/login.html`
    }
}

