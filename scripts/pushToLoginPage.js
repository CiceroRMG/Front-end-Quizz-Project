// toda vez que a pagina iniciar vai rodar as seguintes funções
import { based_url } from "./config.js"


export async function checkIfValidToken(){

    const token = window.localStorage.getItem('token')
    if (!token){
        console.log("Usuário sem token")
        redirectToLogin()
        return false
    }

    const whateverReq = await getOnBackForTestIfTokenIsValid(token)

    if (whateverReq.status === 401){
        console.log("token expirado: tentando entrar na função do refreshtoken")
        const success = await tryMakeANewTokenIfUserHaveARefreshToken()
        if(success){
            console.log("Deu sucesso na resposta do refresh token")
            return true
        } else {
            console.log("token invalido ou inexistente")
            redirectToLogin()
            return false
        }  
    }
    return true

}

// função de requisição só pra ver se o token expirou ou não
export async function getOnBackForTestIfTokenIsValid(token) {
    const pegando = await fetch('http://localhost:3333/userToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': token},
        body: JSON.stringify({ token })
      });

    if (!pegando.ok) {
        return { status: pegando.status, msg: 'Token não é valido' }
    }

    const data = await pegando.json()

    const usuario = data.usuario
    return { usuario, token: window.localStorage.getItem('token') }
}

// função de requisição para pegar um token novo no back
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

// função que tenta fazer um novo token se caso o usuario tiver um refresh token valido
async function tryMakeANewTokenIfUserHaveARefreshToken(){
    try {

        const refreshToken = window.localStorage.getItem("refreshToken")
        if(!refreshToken){
            console.log("refresh token não existe")
            return false
        }


        const response = await getOnBackANewToken(refreshToken)

        if(response.status === 404 || response.status === 401){
            console.log(response.msg)
            return false

        }

        localStorage.setItem('token', response.newtoken)
        localStorage.setItem('refreshToken', response.newRefreshToken)
        console.log("token e refresh token resetados com sucesso")
        return true
        
    } catch (error) {
        console.log(error)
        return false
    }
}


// parte que abre o modal pra confirmar o logou do usuario
const logouBtn = document.querySelector('.logoutBtn')
const dialog = document.querySelector('.dialog')
logouBtn.addEventListener('click', ()=>{
    dialog.showModal()
    dialog.classList.add('fade-in')
})

const logouBtnBack = document.querySelector('.logoutBtnBack')
logouBtnBack.addEventListener('click', ()=>{
    dialog.close()
})
const logoutBtnConfirm = document.querySelector('.logouBtnConfirm')
logoutBtnConfirm.addEventListener('click', await logout)

// parte que realmente desloga o usuario
async function logout(){
    const refreshToken = localStorage.getItem('refreshToken')

    const response = await fetch('http://localhost:3333/refreshToken/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': refreshToken },
        body: JSON.stringify({ refreshToken })
    });

    if(!response){
        return console.log("Algo deu errado na resposta para deletar o refreshToken")
    }

    redirectToLogin()
}

function redirectToLogin(){
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('refreshToken')
    window.location.href = `${based_url}/html/login.html`
}

