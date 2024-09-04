import { buttom } from "../button/buttom.js"

export function Dialog({title, paragraph = null, dialogButtons = [], img = null, a = null, closeBtn = null}){
    const dialog = document.createElement('dialog')
    dialog.classList.add('dialog')

    const div = document.createElement('div')
    div.classList.add('dialog-header')
    if(img){
        const image = document.createElement('img')
        image.setAttribute('src', img)
        div.append(image)
    }

    const h1 = document.createElement('h1')
    h1.innerText = title
    div.append(h1)

    dialog.append(div)

    if(paragraph){
        const p = document.createElement('p')
        p.classList.add('dialog-p')
        p.innerText = paragraph
        dialog.append(p)
    }

    const form = document.createElement('form')
    form.setAttribute('method', 'dialog')
    form.classList.add('dialog-form')

    if(dialogButtons.length > 0){
        for (const button of dialogButtons){
            form.append(buttom({
                text: button.text,
                type: button.type,
                onclick: button.onclick,
                img: button.img,
                btnType: button.btnType,
            }))
        }
        form.style.justifyContent = "flex-end"
    }
    if(a){
        const anchor = document.createElement('a')
        anchor.classList.add('dialogLink')
        anchor.setAttribute('href', a.link)
        anchor.innerText = a.text
        form.append(anchor)
    }
    if(closeBtn){
        const closeBtn = document.createElement('button')
        closeBtn.classList.add('dialogCloseBtn')
        closeBtn.innerHTML = 
            `
                <img src="/components/dialog/img/x.svg">
            `
        closeBtn.onclick = ()=>{
            const dialog = document.querySelector('.dialog')
            dialog.close()
        }
        form.append(closeBtn)
    }

    dialog.append(form)

    return dialog
}