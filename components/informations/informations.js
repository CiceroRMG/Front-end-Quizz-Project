import { Header } from "../header/header.js";
import { buttom } from "../button/buttom.js"



export function InformationsBox({header = null, informations, btn = null}){

    const informationBox = document.createElement('div')
    informationBox.classList.add('informations-box')

    const headerDiv = document.createElement('div')
    headerDiv.classList.add('head-info-div')
    if(header){

        const head = Header({
            title: header.title,
            subtitle: header.subtitle
        })
        headerDiv.append(head)
        informationBox.append(headerDiv)
    }

    const infoUl = Informations(informations)
    informationBox.append(infoUl)


    const btnDiv = document.createElement('div')
    btnDiv.classList.add('btn-info-div')
    if(btn){
        
        const infoBtn = buttom({
            img: btn.img,
            onclick: btn.onclick,
            text: btn.text,
            type: btn.type,
            btnType: btn.btnType,
            disabled: btn.disabled
        })
        btnDiv.append(infoBtn)
        informationBox.append(btnDiv)
    }

    return informationBox
}


function Informations(items){

    const ul = document.createElement('ul')
    ul.classList.add('informations-ul')

    const itemsOnArray = Object.values(items)

    itemsOnArray.forEach((item)=>{
        const li = document.createElement('li')
        li.classList.add('informations-li')
        li.innerHTML = 
            `
                <h1 class="info-title">${item.title}:</h1><span info-span>${item.content}</span>
            `
        ul.append(li)
    })


    return ul
}