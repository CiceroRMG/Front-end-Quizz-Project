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
        console.log("tentando entrar na função do refreshtoken")
        if(await tryMakeANewTokenIfUserHaveARefreshToken()){
            console.log("token resetado com sucesso")
            return true
        }
        console.log("token invalido ou inexistente")
        window.location.href = `${based_url}/html/login.html`
        return false
    } else {
        return true
    }

}

checkIfValidToken(token)



export async function getOnBackANewToken(refreshToken){
    const pegando = await fetch('http://localhost:3333/refreshToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': refreshToken },
        body: JSON.stringify({ refreshToken })
      });

    if(!pegando.ok){
        return { status: pegando.status, msg: "O refresh Token não é valido"}
    }  

    const response = await pegando.json()

    return response
}

async function tryMakeANewTokenIfUserHaveARefreshToken(){
    try {

        const refreshToken = window.localStorage.getItem("refreshToken")
        if(refreshToken){

            const response = await getOnBackANewToken(refreshToken)
            console.log(response)
            if(response.status === 404 || response.status === 401){

                console.log(response.msg)
                return false

            } else{

                localStorage.setItem('token', response.newtoken)
                localStorage.setItem('refreshToken', response.newRefreshToken)
                console.log("token e refresh token resetados com sucesso")
                return true
            }

        } else {
            console.log("não refresh token")
            return false
        }
    } catch (error) {
        console.log(error)
    }
}




const logoutBtn = document.querySelector('.logoutBtn')
logoutBtn.addEventListener('click', logout)

function logout(){
    if(token){
        window.localStorage.clear('token')
        window.location.href = `${based_url}/html/login.html`
    }
}

