
const mainNav = {
    mainComponents: [
        componente1, componente2
    ],
    footerComponents: [
        componente1, componente2
    ],
}





function navBarItens({img, text, link, type = "a"}){
    // img // text // type -> a or ul
    const div = document.createElement("div")
    div.classList.add('element')

    const image = document.createElement('img')
    image.setAttribute('src', img)

    if (type === "a"){
        const elementLink = document.createElement('a')
        elementLink.innerText = text
        elementLink.setAttribute('href', link)
    }
    if (type === "ul"){
        const elementUl = document.createElement('button')
        elementUl.innerText = text
        const arrow = document.createElement('img')
        arrow.setAttribute("src", "./img/arrow.svg")
        arrow.classList.add("arrow-nav")
        elementUl.append(arrow)
    }

}



function navBar({mainComponents = [], footerComponents = []}){

    // header
    const logo = document.createElement("div")
    logo.classList.add("logo")
    const logoImg = document.createElement("img")
    logoImg.setAttribute('src', './img/logo.svg')
    logo.appendChild(logoImg)


    // nav
        // vai ser composto de componentes
        // aqui tem que receber uma array, por que dependendo de quantos componentes for usar tem que dar um forEach() pra adicionar na lista



    // footer
        // vai ser composto de 1 ou 2 componentes (logout(obrigatorio) e trocar a senha)
}





    <div class="nav-footer">
    <a href="#" class="logoutBtn">|** <span>Logout</span></a>
    <dialog class="dialog">
        <h1>Tem certeza que deseja sair?</h1>
        <form method="dialog" class="dialog-form">
            <button class="logouBtnConfirm">Sair</button>
            <button class="logoutBtnBack">Voltar</button>
        </form>
    </dialog>
    </div>