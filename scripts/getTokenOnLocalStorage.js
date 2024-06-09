// só pega o token no local storage
export function getTokenOnLocalStorage(){
    const token = localStorage.getItem('token')
    return token
} 