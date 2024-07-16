import { buttom } from "../button/buttom.js"

export function Dialog({title, paragraph = null, dialogButtons = []}){
    const dialog = document.createElement('dialog')
    dialog.classList.add('dialog')

    const h1 = document.createElement('h1')
    h1.innerText = title
    dialog.append(h1)

    if(paragraph){
        const p = document.createElement('p')
        p.innerText = paragraph
        dialog.append(p)
    }

    const form = document.createElement('form')
    form.setAttribute('method', 'dialog')
    form.classList.add('dialog-form')
    for (const button of dialogButtons){
        form.append(buttom({
            text: button.text,
            type: button.type,
            onclick: button.onclick,
            img: button.img
        }))
    }
    dialog.append(form)

    return dialog
}