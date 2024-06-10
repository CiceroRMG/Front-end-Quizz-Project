const form = document.querySelector('.section-form')
form.addEventListener('submit', authenticationLogin)

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
    } else {
        matricula = loginValue;
        sendToBackForAuthentication = await fetch('http://localhost:3333/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matricula: matricula, senha: passwordValue })
  
        });
    }
  

    const backResponse = await sendToBackForAuthentication.json()

    // A propriedade ok é um valor booleano que será true se o status da resposta estiver no intervalo de 200-299
    if (sendToBackForAuthentication.ok) {
        localStorage.setItem('token', backResponse.token);  // Armazenar o token no localStorage
        window.location.href = '/html/index.html';
      } else {
        toogleLoginData.incorrectData();
      }
}


const toogleLoginData = {
  span: document.querySelectorAll('.fail'),

  incorrectData() {
    this.span.forEach(span => {
      span.classList.remove('hidden')
    })
  },

  correctData() {
    this.span.forEach(span => {
      span.classList.add('hidden')
    })
  }
}