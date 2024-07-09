const form = document.querySelector('.section-form')
form.addEventListener('submit', authenticationLogin)

const alunoUrl = '/html/alunoFlowPages/index.html'
const professorUrl = '/html/professorFlowPages/index.html'
const admUrl = '/html/admFlowPages/index.html'


// função de autenticação do usuário
export async function authenticationLogin(event) {
    event.preventDefault()
    toogleLoginData.correctData()

    const loginValue = document.querySelector('#login').value
    const passwordValue = document.querySelector('#password').value

    let email, matricula, sendToBackForAuthentication;

    // checa se tem @ ou não no valor, pra diferenciar se é um email ou matricula
    if (loginValue.includes('@')) {
        email = loginValue;
        sendToBackForAuthentication = await fetch('http://localhost:3333/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, senha: passwordValue })
  
        });
    } else if(loginValue.length == "8") {
        matricula = loginValue;
        sendToBackForAuthentication = await fetch('http://localhost:3333/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matricula: matricula, senha: passwordValue })
  
        });
    } else {
      return toogleLoginData.incorrectData()
    }
  

    const backResponse = await sendToBackForAuthentication.json()
  
    // A propriedade ok é um valor booleano que será true se o status da resposta estiver no intervalo de 200-299
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
  input: document.querySelectorAll('.form-input'),
  span: document.querySelector('.span'),

  incorrectData() {
    this.input.forEach(input => {
      input.classList.add('fail')
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


function userLogged(){
    const token = window.localStorage.getItem('token')
    if(token){
      history.back();

    } else {
      console.log("Usuario não esta logado ou token expirado")
    }

}

userLogged()

// botao de olhar a senha
const seeBtn = document.querySelector('.eyes')
const seeClickedBtn = document.querySelector('.eyes-see')
const inputPassword = document.querySelector('#password')

seeBtn.addEventListener('click', ()=>{
  seeBtn.classList.add('hidden')
  seeClickedBtn.classList.remove('hidden')
  inputPassword.setAttribute('type', 'text')
})

seeClickedBtn.addEventListener('click', ()=>{
  seeBtn.classList.remove('hidden')
  seeClickedBtn.classList.add('hidden')
  inputPassword.setAttribute('type', 'password')
})
