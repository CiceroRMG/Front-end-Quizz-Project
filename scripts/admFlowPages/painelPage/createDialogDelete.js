export function createDialog(){
    const div = document.querySelector('.main-hero')
    
    const dialog = document.createElement('dialog')
    dialog.classList.add('dialog-delete-btn')
    dialog.innerHTML = 
        `
            <h1 class="dialog-delete-title">Tem certeza que deseja deletar?</h1>
            <p class="dialog-delete-name">Nome</p>
            <p class="dialog-delete-p">Ao deletar todos os dados serão perdidos</p>
            <form method="dialog" class="dialog-delete">
                <button class="deleteBtnConfirm">Deletar</button>
                <button class="deleteBtnBack">Voltar</button>
            </form>
        `
    div.append(dialog)
    return dialog    
}