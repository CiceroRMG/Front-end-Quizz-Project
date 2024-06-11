// toda vez que a pagina iniciar vai rodar as seguintes funções
import { getOnBackUserByToken} from "./fetchDbFunctions.js"

const token = window.localStorage.getItem('token')

function haveToken(token){
    if (!token){
        console.log("Usuário sem token")
        window.location.href = 'http://127.0.0.1:5500/html/login.html'
    } else{
        return console.log('Usuario possui token')
    }
}

haveToken(token)

async function checkIfValidToken(token){
    const whateverReq = await getOnBackUserByToken(token)
    if (whateverReq.status === 401){
        console.log("token invalido ou inexistente")
        window.location.href = 'http://127.0.0.1:5500/html/login.html'
    } else {
        console.log("Ok")
    }

}

checkIfValidToken(token)

