function createSuccessModal(){
    const div = document.createElement('div')
    div.classList.add('success-modal')
    div.classList.add('animate-in-left')

    div.innerHTML = 
    `
        <div class="title-modal"><img src="../../imgs/success-modal.svg"><h1>Sucesso!</h1></div>
        <p>Disciplina criada com sucesso.</p>
    `

    const main = document.querySelector('.main')
    main.append(div)

    return div
}

export function displaySuccessModal(){
    let modal = ""
    modal = createSuccessModal()
    setTimeout(()=>{
        setTimeout(()=>{
            modal.remove()
        }, 2000)
        modal.classList.add('animate-in-right')
    }, 3000)
}