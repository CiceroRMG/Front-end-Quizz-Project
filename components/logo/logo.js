export function Logo(){
    const logo = document.createElement("div")
    logo.classList.add("logo")
    const logoImg = document.createElement("img")
    logoImg.setAttribute('src', '../logo/img/logo.svg')
    logo.appendChild(logoImg)
    
    return logo
}