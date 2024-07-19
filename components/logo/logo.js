export function Logo(){
    const logo = document.createElement("div")
    logo.classList.add("logo")
    const logoImg = document.createElement("img")
    logoImg.setAttribute('src', './logo/img/logo.svg')
    logo.appendChild(logoImg)
    
    const h1 = document.createElement('h1')
    h1.innerText = "Polvo"
    logo.append(h1)

    return logo
}