// criando o dialog do botao de delete
export function dialogDeleteBtn(){

    const dialog = document.querySelector('.dialog-delete-btn')
    dialog.showModal()
    dialog.classList.add('animate-in')
    
    const deleteBtnBack = document.querySelector('.deleteBtnBack')
    deleteBtnBack.addEventListener('click', ()=>{
        dialog.close()
    })
}

export function changeDialogMessageBtnDelete(title, message, name){
    const h1 = document.querySelector('.dialog-delete-title')
    h1.innerText = title

    const nome = document.querySelector('.dialog-delete-name')
    nome.innerText = `${name}`

    const p = document.querySelector('.dialog-delete-p')
    p.innerText = message
}