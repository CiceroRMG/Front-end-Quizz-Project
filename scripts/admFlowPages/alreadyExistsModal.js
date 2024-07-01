function createExistsModal(msg){
    const div = document.createElement('div')
    div.classList.add('exists-modal')
    div.classList.add('animate-in-left')

    div.innerHTML = 
    `
        <div class="title-modal"><img src="../../imgs/x.svg"><h1>Erro!</h1></div>
        <p>${msg}</p>
    `

    const main = document.querySelector('.main')
    main.append(div)

    return div
}

export function displayExistsModal(msg){
    let modal = ""
    modal = createExistsModal(msg)
    setTimeout(()=>{
        setTimeout(()=>{
            modal.remove()
        }, 3000)
        modal.classList.add('animate-in-right')
    }, 4000)
}