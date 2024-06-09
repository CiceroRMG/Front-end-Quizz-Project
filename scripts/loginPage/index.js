const form = document.querySelector('.section-form')
form.addEventListener('submit', authenticationLogin)

// função de autenticação do usuário
export async function authenticationLogin(event) {
    event.preventDefault()

    const loginValue = document.querySelector('#login').value
    const passwordValue = document.querySelector('#password').value

    const sendToBackForAuthentication = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginValue, senha: passwordValue })

      });

    const backResponse = await sendToBackForAuthentication.json()

    // A propriedade ok é um valor booleano que será true se o status da resposta estiver no intervalo de 200-299
    if (sendToBackForAuthentication.ok) {
        localStorage.setItem('token', backResponse.token);  // Armazenar o token no localStorage
        window.location.href = '/html/index.html';
      } else {
        alert('Email ou senha incorretos');
      }
}
