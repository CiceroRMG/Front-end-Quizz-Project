function createSuccessModal(msg){
    const div = document.createElement('div')
    div.classList.add('success-modal')
    div.classList.add('animate-in-left')

    div.innerHTML = 
    `
        <div class="title-modal"><img src="../../imgs/success-modal.svg"><h1>Sucesso!</h1></div>
        <p>${msg}</p>
    `

    const main = document.querySelector('.main')
    main.append(div)

    return div
}

export function displaySuccessModal(msg){
    let modal = ""
    modal = createSuccessModal(msg)
    setTimeout(()=>{
        setTimeout(()=>{
            modal.remove()
        }, 3000)
        modal.classList.add('animate-in-right')
    }, 4000)
}