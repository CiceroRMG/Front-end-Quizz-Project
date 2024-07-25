import { Dialog } from "../dialog/dialog.js"

function createEditBtn(anchor){
    const editBtn = document.createElement('a')
    editBtn.setAttribute('href', anchor)
    editBtn.classList.add('table-element-a')
    editBtn.classList.add('edit-a-table')
    editBtn.innerText = 'Editar'

    return editBtn
}

function createRemoveBtn(){
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('table-element-button')
    removeBtn.innerText = 'Remover'
    return removeBtn
}

export function TableItem(item, dialogData, editAnchor){

    const tr = document.createElement('tr')
    tr.classList.add('tr-body')

    const objectForArray = Object.values(item)

    objectForArray.forEach((value)=>{
        const td = document.createElement('td')
        td.classList.add('table-td')
        if(typeof value === 'object'){
            
            const element = document.createElement(value.as)
            element.innerText = value.content
            
            if(value.hoverItens){
                element.classList.add('hover')
                const ul = document.createElement('ul')
                ul.classList.add('hover-content')
                ul.classList.add('hidden')
                element.addEventListener('mouseover', () => {
                    ul.classList.add('animate-in');
                    value.hoverItens.forEach((li)=>{
                        const liDiv = document.createElement('li')
                        liDiv.innerHTML = `<p>${li}</p>`
                        ul.append(liDiv)
                    })
                    ul.classList.remove('hidden');
                });
            
                element.addEventListener('mouseout', () => {
                    ul.classList.add('hidden');
                    ul.innerHTML = ''
                });
                element.append(ul)
            }

            if(value.as === "button"){
                element.classList.add('table-element-button')
                element.onclick = ()=> value.onclick(item.name)
            }
            if(value.as === "a"){
                element.classList.add('table-element-a')
                element.setAttribute('href', value.href)
            }
            if(value.as === "h1"){
                element.classList.add('table-element-h1')
            }
            if(value.as === "p"){
                element.classList.add('table-element-p')
            }
            if(value.as === "span"){
                element.classList.add('table-element-tag')
            }

            td.append(element)

        } else{
            td.innerHTML = 
                `
                    <p class="table-element-p">${value}</p>
                `
        }
        tr.append(td)
    })

    const tdActions = document.createElement('td')
    tdActions.classList.add('table-td')
    tdActions.classList.add('actions')

    const editBtn = createEditBtn(editAnchor)
    const removeBtn = createRemoveBtn()
    
    removeBtn.addEventListener('click', ()=>{
        const deleteDialog = {
            title: dialogData.title,
            paragraph: dialogData.paragraph,
            dialogButtons: dialogData.dialogButtons
        } 
        const dialog = Dialog(deleteDialog)
        tr.append(dialog)
        dialog.showModal()
        dialog.classList.add('animate-in')
    })

    tdActions.append(editBtn)
    tdActions.append(removeBtn)

    tr.append(tdActions)

    return tr
}


export function Table({columns = [{text}], rows = [], dialogData, editAnchor}){
    const container = document.createElement('div')
    container.classList.add('table-container')

    const table = document.createElement('table')
    table.classList.add('table')

    const thead = document.createElement('thead')
    thead.classList.add('thead')
    const headTr = document.createElement('tr')
    thead.append(headTr)

    for(const column of columns){
        const th = document.createElement('th')
        const content = document.createElement('p')
        content.innerText = column.text

        th.append(content)
        headTr.append(th)
    }

    table.append(thead)

    const tbody = document.createElement('tbody')
    tbody.classList.add('tbody')

    for(const row of rows){
        const trElement = TableItem(row, dialogData, editAnchor)
        tbody.append(trElement)
    }

    table.append(tbody)

    container.append(table)

    return container
}
