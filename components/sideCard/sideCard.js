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
    itens.forEach((item) => {
        const li = SideCardItem({key: item.key, value: item.value})
        list.append(li)
    });

    container.append(list)

    if(btn){
        const btnSideCard = buttom(btn)
        container.append(btnSideCard)
    }


    return container

}

function SideCardItem({key, value}){

    const li = document.createElement('li')
    li.classList.add('li-sideCard')

    li.innerHTML = 
        `
            <h2 class="li-title">${key}</h2>
            <p class="li-p">${value}</p>
        `

    return li
}