import { buttom } from "../button/buttom.js"



export function SideCard({title, itens = [], btn = null}){

    const container = document.createElement('div')
    container.classList.add('sideCard-container')

    const header = document.createElement('h1')
    header.classList.add('title-sideCard')
    header.innerHTML = `<p>${title}</p>`
    
    container.append(header)

    const list = document.createElement('ul')
    list.classList.add('ul-sideCard')

    if(itens.length < 1){
        const span = document.createElement('span')
        span.innerText = "Não possui tentativas"
        list.append(span)
        list.style.justifyContent = "center"
        list.style.height = "100%"
    } else {
        
        itens.forEach((item) => {
            const li = SideCardItem({key: item.key, value: item.value, id: item.id, anchor: item.anchor})
            list.append(li)
        });
    }


    container.append(list)

    if(btn){
        const btnSideCard = buttom(btn)
        container.append(btnSideCard)
    }


    return container

}

function SideCardItem({key, value, id, anchor = null}){

    const li = document.createElement('li')
    li.classList.add('li-sideCard')

    if(anchor){
        li.innerHTML = 
        `
            <h2 class="li-title">${key}</h2>
            <p class="li-p" id="${id}">${value}</p>
            <a class="li-a" href="${anchor.a}">${anchor.text}</a>
        `
    } else{
        li.innerHTML = 
            `
                <h2 class="li-title">${key}</h2>
                <p class="li-p" id="${id}">${value}</p>
            `
    }


    return li
}