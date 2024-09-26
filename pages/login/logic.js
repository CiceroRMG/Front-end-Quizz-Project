import { baseUrl } from "../../scripts/config.js"
import { getOnBackUserTypeByToken } from "../../scripts/fetchDbFunctions.js"

const form = document.querySelector('.section-form')
form.addEventListener('submit', authenticationLogin)

const alunoUrl = '/pages/student/dashboard/dashboard.html'
const professorUrl = '/pages/professor/dashboard/dashboard.html'
const admUrl = '/pages/admin/dashboard/dashboard.html'


async function userLogged(){
  const token = window.localStorage.getItem('token')
  if(token){

    const typeOfUser = await getOnBackUserTypeByToken()
    if (typeOfUser) {
        if(typeOfUser.usuario === 'aluno'){
          window.location.href = alunoUrl;
        }
        if(typeOfUser.usuario === 'professor'){
          window.location.href = professorUrl;
        }
        if(typeOfUser.usuario === 'admin'){
          window.location.href = admUrl;
        }
    }

    } else {
      console.log("Usuario não esta logado ou token expirado")
    }

}
userLogged()

export async function authenticationLogin(event) {
    event.preventDefault()
    toogleLoginData.correctData()

    const loginValue = document.querySelector('#login').value.toLowerCase()
    const passwordValue = document.querySelector('#password').value

    let email, matricula, sendToBackForAuthentication;

    if (loginValue.includes('@')) {
        email = loginValue;
        sendToBackForAuthentication = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, senha: passwordValue })
  
        });
    } else if(loginValue.length == "8") {
        matricula = loginValue;
        sendToBackForAuthentication = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matricula: matricula, senha: passwordValue })
  
        });
    } else {
      return toogleLoginData.incorrectData()
    }

    const backResponse = await sendToBackForAuthentication.json()
  
    if (sendToBackForAuthentication.ok) {
        localStorage.setItem('token', backResponse.token);
        localStorage.setItem('refreshToken', backResponse.refreshToken);
        const userType = backResponse.tipo
        if(userType === 'aluno'){
          window.location.href = alunoUrl;
        }
        if(userType === 'professor'){
          window.location.href = professorUrl;
        }
        if(userType === 'admin'){
          window.location.href = admUrl;
        }

      } else {
        toogleLoginData.incorrectData();
      }
}


const toogleLoginData = {
  input: document.querySelectorAll('.input'),
  span: document.querySelector('.input-error'),

  incorrectData() {
    this.input.forEach(input => {
      input.classList.add('fail')
      this.span.classList.add('animate-in-hover')
      this.span.classList.remove('hidden')
    })
  },

  correctData() {
    this.input.forEach(input => {
      input.classList.remove('fail')
      this.span.classList.add('hidden')
    })
  }
}



