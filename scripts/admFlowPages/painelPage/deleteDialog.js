// criando o dialog do botao de delete
export function dialogDeleteBtn(dialog){
    dialog.showModal()
    dialog.classList.add('animate-in')
    
    const deleteBtnBack = dialog.querySelector('.deleteBtnBack')
    deleteBtnBack.addEventListener('click', ()=>{
        dialog.remove()
        dialog.close()
    })
}

export function changeDialogMessageBtnDelete(dialog, title, message, name){
    const h1 = dialog.querySelector('.dialog-delete-title')
    h1.innerText = title

    const nome = dialog.querySelector('.dialog-delete-name')
    nome.innerText = `${name}`

    const p = dialog.querySelector('.dialog-delete-p')
    p.innerText = message
    
}