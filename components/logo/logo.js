export function Logo({color = "white"}){
    const logo = document.createElement("div")
    logo.classList.add("logo")
    
    const logoImg = document.createElement("img")
    const h1 = document.createElement('h1')
    h1.innerText = "Polvo"

    if(color = "black"){
        logoImg.setAttribute('src', '/components/logo/img/logoBlack.svg')
        h1.style.color = "#334155"

    } else {
        logoImg.setAttribute('src', '/components/logo/img/logo.svg')
    }
    
    logo.appendChild(logoImg)  
    logo.append(h1)

    return logo
}